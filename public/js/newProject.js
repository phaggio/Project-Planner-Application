"use strict";

const addTeamsToOptions = (arr, selectTeam) => {
  if (!arr) {
    return;
  }
  for (const teamObj of arr) {
    const option = $(`<option>`);
    option.data(`team-id`, teamObj.id);
    option.append(`${teamObj.name}`);
    selectTeam.append(option);
  }
};

const getAllTeams = selectTeam => {
  $.get(`/api/teams`, (data, status) => {
    console.log(`Data: ${data}, Status: ${status}`);
    addTeamsToOptions(data, selectTeam);
  });
};

const onReady = () => {
  const selectTeam = $(`.select-team`);
  const cancelButton = $(`.cancel-button`);
  cancelButton.on(`click`, () => {
    const home = `/dashboard`;
    window.location = home;
  });
  selectTeam.change(() => {
    // get team-id from selected option
    console.log($(`.select-team option:selected`).data(`team-id`));
  });

  getAllTeams(selectTeam);

  $(`#newProjectSubmit`).on(`click`, () => {
    const newProject = {
      name: $(`#new-project-name`)
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      team_id: $(`.select-team option:selected`).data(`team-id`),
      description: $(`#new-project-description`)
        .val()
        .trim()
    };
    console.log(newProject);
    $.ajax(`/api/projects`, {
      type: `POST`,
      data: newProject
    }).then(() => {
      console.log(`Success`);
      if ($(`#add-task`).prop(`checked`)) {
        const newTask = `/newTask`;
        window.location = newTask;
      } else {
        const goHome = `/dashboard`;
        window.location.replace(goHome);
      }
    });
  });
};

$(document).ready(onReady);

if(typeof exports !== `undefined`) {
  exports.addTeamsToOptions = addTeamsToOptions;
}
