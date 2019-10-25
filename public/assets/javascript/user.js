$("#register-btn").on("click", () => {
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    method: "POST",
    url: "/users",
    data: JSON.stringify({ email, password }),
    contentType: "application/json"
  }).done((data) => {
    localStorage.setItem("authenticationToken", data.token);
    redirect(token)
  }).fail((error) => {
    handleErrors(error);
  })
});

$("#login-btn").on("click", () => {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    method: "POST",
    url: "/session",
    data: JSON.stringify({ email, password }),
    contentType: "application/json"
  }).done((data) => {
    localStorage.setItem("authenticationToken", data.token);
    redirect(token)
  }).fail((error) => {
    handleErrors(error);
  });
});

redirect = (token) => {
  $.ajax({
    method: "GET",
    url: "/projects",
    headers: {
      "authorization": token
    }
  });
}
