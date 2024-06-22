"use strict";

const Course = require("../../models/Course");

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");

    $.get("/api/courses", (results = {}) => {
      let data = results.data;

      if (!data || !data.courses) return;

      console.log(data.courses);

      data.courses.forEach((course) => {
        console.log(Course);

        $(".modal-body").append(
          `<div>
            <h5 class="course-title">${course.title}</h5>
            <p class="course-description">${course.description}</p>
            <button class="btn btn-info course-button
              ${course.joined ? "joined-button" : "join-button"}" 
              data-id="${course._id}">View
                ${course.joined ? "Joined" : "Join"}
              </button>
          </div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });

    $("#myModal").modal("show");
  });

  $(".dismiss-modal").click(() => {
    $("#myModal").modal("hide");
  });
});

let addJoinButtonListener = () => {
  $(".modal-body").on("click", ".join-button", (event) => {
    let $button = $(event.target),
      courseId = $button.data("id");

    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;

      console.log("Joining course: ", courseId);
      console.log(results.data);

      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.after(
          `<em style="color:red; margin-left: 10px; padding-top: 2px;">${results.message}</em>`
        );
      }
    });
  });
};
