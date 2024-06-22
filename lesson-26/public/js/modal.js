// public/js/modal.js
"use strict";

/**
Listing 26.6 (p. 388)
*/
$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html(""); // 모달 내용은 다 지워요

        $.get("/courses?format=json",(data)=>{
            data.forEach(course => {
                $("modal-body").append(
                    `<div>
                        <h5 class="course-title">${course.title}</h5>
                        <p clss="course-description">${course.decsription}/p
                        <p><a href="/courses/${course._id}">View Course</a><p>
                        <button class="btn btn-info" data-id="${course._id}>Join</button>
                    <div>`
                );
            });
        });
    });
});