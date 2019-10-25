var template = Handlebars.compile($("#project-template").html());

$(document).ready(() => {
  console.log("ads")
  showProjects();
});

$("#create-project").on("click", () => {
  let title = $("#project-title").val();
  let description = $("#project-description").val();
  $.ajax({
    method: "POST",
    url: "/project",
    data: JSON.stringify({ title, description }),
    headers: {
      "authorization": token
    },
    contentType: "application/json"
  }).done((data) => {
    $("#project-modal").modal("hide");
    loadProjects(data);
  });
});

showProjects = () => {
  const token = localStorage.getItem("authenticationToken")

  $.ajax({
    method: "GET",
    url: "/projects",
    headers: {
      "authorization": token
    }
  })
    .done((data) => {
      $("#register, #login").hide();
      $("#projects").show();
      $("nav #actions").show();

      data.forEach(project => {
        loadProjects(project);
      });
    })
    .fail(() => {
      showLogin();
    });
}

showRegister = () => {
  $("#login").hide();
  $("#register").show();
}

showLogin = () => {
  $("#register").hide();
  $("#login").show();
}

showErrors = (error) => {
  console.log(error)
}

loadProjects = (project) => {
  $("tbody").append(template(project)); // imprimimos la respuesta
}

handleErrors = (error) => {
  if (error.status == 422) {
    console.log("Yey")
  }
}

$("#register-link").on("click", showRegister);
$("#login-link").on("click", showLogin);
