'use strict';

$(document).ready(() => {
  const selectProject = $(`.select-project`);
  const selectUser = $(`.select-user`);
  const cancelButton = $(`.cancel-button`);
  cancelButton.on(`click`, () => {
    const home = `/`;
    window.location = home;
  });

  const addProjectsToOptions = arr => {
    if (!arr) {
      return;
    }
    for (const projectObj of arr) {
      const option = $(`<option>`);
      option.data(`project-id`, projectObj.id);
      option.data(`team-id`, projectObj.team_id);
      option.append(`${projectObj.name}`);
      selectProject.append(option);
    }
    return;
  };

  // const addUsersToOptions = arr => {
  //   if (!arr) {
  //     return;
  //   }
  //   for (const userObj of arr) {
  //     const option = $(`<option>`);
  //     option.data(`user-id`, userObj.user_id);
  //     option.append(`${userObj.user_name}`);
  //     selectUser.append(option);
  //   }
  //   return;
  // };

  const getAllProjects = () => {
    $.get(`/api/projects`, (data, status) => {
      console.log(`Data: ${data}, Status: ${status}`);
      addProjectsToOptions(data);
    });
  };

  const getAllUsersByTeamId = teamId => {
    $.get(`/api/teams/${teamId}`, (data, status) => {
      console.log(`Data: ${data}, Status: ${status}`);
    });
  };

  // console.log out selected projectd id
  selectProject.change(() => {
    // get project-id from selected option
    const selectedProjectId = $(`.select-project option:selected`).data(`project-id`);
    const selectedTeamId = $(`.select-project option:selected`).data(`team-id`);
    console.log(`Selected Project ID: ${selectedProjectId}`);
    console.log(`Selected Team ID: ${selectedTeamId}`);
    getAllUsersByTeamId(selectedTeamId);
  });

  // console.log out selected user id
  selectUser.change(() => {
    // get team-id from selected option
    console.log($(`.select-user option:selected`).data(`user-id`));
  });

  getAllProjects();
  getAllUsersByTeamId(1);
});
