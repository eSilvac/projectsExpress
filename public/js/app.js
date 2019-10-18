var template = Handlebars.compile($("#project-template").html());

$(document).ready(() => {
  showProjects();
});

$("#create-project").on("click", () => {
  let title = $("#project-title").val();
  let description = $("#project-description").val();
  $.ajax({
    method: "POST",
    url: "/project",
    data: JSON.stringify({ title, description }),
    contentType: "application/json"
  }).done((data) => { 
    $("#project-modal").modal("hide");
    loadProjects(data);
  });
});

$("#register-btn").on("click", () => {
  let email = $("#register-email").val();
  let password = $("#register-password").val();
  
  $.ajax({
    method: "POST",
    url: "/register",
    data: JSON.stringify({ email, password }),
    contentType: "application/json"
  }).done((data) => { 
    showProjects();
  }).fail((error) => {
    showErrors(error);
  })
});

$("#login-btn").on("click", () => {
  let email = $("#login-email").val();
  let password = $("#login-password").val();
  
  $.ajax({
    method: "POST",
    url: "/login",
    data: JSON.stringify({ email, password }),
    contentType: "application/json"
  }).done((data) => { 
    showProjects();
  }).fail((error) => {
    showErrors(error);
  });
});

showProjects = () => {
  $.ajax({
    method: "GET",
    url: "/projects"
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

$("#register-link").on("click", showRegister);
$("#login-link").on("click", showLogin);
