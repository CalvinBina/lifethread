function login(username, password) {
  var data_string = "username=" + escape(username) + "&password=" + escape(password);
  $.ajax({
    type: "POST",
    url: "login.php",
    data: data_string,
    cache: false,
    success: function(result) {
      if (result == "0") {
        alert("Invalid username or password!");
        // Do something about failing to successfully login here
        /*
        html_string = "<ul class=\"nav navbar-nav\"> <li class=\"active\"><a href=\"#\">Home</a></li> <li><a href=\"#\">Appointments</a></li> </ul>"
        $("#navbar").html(html_string);
        */
      }
      else {
        load_home(result);
        //$("#log_text").text(result);
      }
    }
  });
}

function logout() {
  $.ajax({
    type: "POST",
    url: "logout.php",
    data: "",
    cache: false,
    success: load_login
  });
}

function authenticate() {
  $.ajax({
    type: "POST",
    url: "authenticate.php",
    data: "",
    cache: false,
    success: function(result) {
      if (result == "0") {
        load_login();
        //html_string = "<ul class=\"nav navbar-nav\"> <li class=\"active\"><a href=\"#\">Home</a></li> <li><a href=\"#\">Appointments</a></li> </ul>"
        //$("#navbar").html(html_string);
        //$("#navbar").load("components.html #user_dropdowns");
      }
      else {
        load_home(result);
      }
    }
  });
}

function create_account(user_type, name, username, password, address) {
  var data_string = "user_type=" + user_type + "&name=" + name + "&username=";
  data_string += escape(username) + "&password=" + escape(password) + "&address=" + escape(address);
  $.ajax({
    type: "POST",
    url: "create_account.php",
    data: data_string,
    cache: false,
    success: function(result) {
      if (result == "0") {
        alert("Could not create account!");
      }
      else {
        $("#content").html("<p>Account successfully created! <a href='main.html'>Return to the home page.</a></p>"); 
      }
    }
  });
}

function load_create_staff() {
    $("#content").load("components.html #create_staff_acc_form");
    $(document).on("click", "#submit_new_account", function() {
      var name = $("#new_name").val();
      var username = $("#new_username").val();
      var password = $("#new_password").val();
      var confirmed_password = $("#confirmed_password").val();
      var address = $("#new_address").val();
      var type = $("#new_type").val();
      if (password != confirmed_password) {
        alert("Passwords do not match!");
      }
      else {
        create_account(type, name, username, password, address);
      }
    });
}

function load_login() {
  $("#navbar").load("components.html #login_form");
  $("#content").load("components.html #login_content");
  $(document).on("click", "#login_button", function() {
    var username = $("#username_field").val();
    var password = $("#password_field").val();
    login(username, password);
  });
  $(document).on("click", "#create_account_button", function() {
    $("#content").load("components.html #create_account_form");
    $(document).on("click", "#submit_new_account", function() {
      var name = $("#new_name").val();
      var username = $("#new_username").val();
      var password = $("#new_password").val();
      var confirmed_password = $("#confirmed_password").val();
      var address = $("#new_address").val();
      if (password != confirmed_password) {
        alert("Passwords do not match!");
      }
      else {
        create_account("Patient", name, username, password, address);
      }
    });
  });
  /*
  $("#login_button").click(function() {
    alert("Clicked!");
    var username = $("#username_field").val();
    var password = $("#password_field").val();
    login(username, password);
  });
  */
}

function load_view_balance() {
  $.ajax({
    type: "POST",
    url: "finances.php",
    data: "action=view",
    cache: false,
    success: function(response) {
      $("#content").html("<p>Your current unpaid balance is: $" + result + "</p>"); 
    }
  });
}

function load_home(user_type) {
    if (user_type == 'Patient') {
        $("#navbar").load("components.html #user_dropdowns");
    } else if (user_type == 'Nurse Practitioner' || user_type == 'Physician' || user_type == 'Specialist') {
        $("#navbar").load("components.html #phys_dropdowns");
    } else if (user_type == 'Admin') {
        $("#navbar").load("components.html #admin_dropdowns");
    } else if (user_type == 'EMT') {
        $("#navbar").load("components.html #emt_dropdowns");
    } else if (user_type == 'Nurse' || user_type == 'Technician') {
        $("#navbar").load("components.html #nurse_dropdowns");
    }

  $("#content").load("components.html #home_content", function() {
    $.ajax({
      type: "POST",
      url: "session.php",
      data: "attribute=name",
      cache: false,
      success: function(result) {
        $("#greeting").html("<h3>Welcome, " + result + ".</h3>");
      }      
    });
  });
  /*
  $.ajax({
    type: "POST",
    url: "session.php",
    data: "attribute=name",
    cache: false,
    success: function(result) {
      $("#content").load("components.html #home_content", function() {
        $("#greeting").val("Welcome, " + result + ".");    
      });
    }
  });
  */
  /*
  $("#content").load("components.html #home_content", function() {
    var name;
    $.ajax({
      type: "POST",
      url: "session.php",
      data: "attribute=name",
      cache: false,
      success: function(result) {
        //$("#greeting").val("Welcome, " + result);
        name = result;
      }
    });
    $("#greeting").val("Welcome, " + name);
  });
  */
  $(document).on("click", "#logout_button", logout);
  $(document).on("click", "#update_profile", function() {
    $("#content").load("components.html #update_account_form", function() {
        $.ajax({
            type: "POST",
            url: "get_info.php",
            data: "",
            cache: false,
            success: function(result) {
                var parsed = JSON.parse(result);
                $("#new_address").val(parsed[0].Address);
                $("#new_password").val(parsed[0].Password);
                $("#confirmed_password").val(parsed[0].Password);
            }
        });
    });
    $(document).on("click", "#update_account_btn", function() {
        var new_addr = $("#new_address").val();
        var new_pass = $("#new_password").val();
        var conf_pass = $("#confirmed_password").val();
        if (new_pass != conf_pass) {
            alert("Passwords do not match!");
        } else if (new_addr == "" || new_pass == "" || conf_pass == "") {
            alert("Please fill in all fields.");
        } else {
            $.ajax({
                type: "POST",
                url: "update_info.php",
                data: "addr="+new_addr+"&pass="+new_pass,
                cache: false,
                success: function(result) {
                    if (result == 0) {
                        $("#content").html("<p>Could not update account! <a href='main.html'>Return to the home page.</a></p>");
                    } else {
                        $("#content").html("<p>Account updated! <a href='main.html'>Return to the home page.</a></p>");
                    }
                }
            });
        }
    });
  });
  $(document).on("click", "#view_appointments", function() {
    $.ajax({
      type: "POST",
      url: "appointments.php",
      data: "action=view",
      cache: false,
      success: function(result) {
        if (result == "no appointments") {
          //$("#content").html("<p>You have no appointments</p>");
          $("#content").html("<p>You have no appointments.</p>");
        }
        else {
          //$("#content").html(result);
          var parsed = JSON.parse(result);
          var even = [];
          var count;
          for (count = 0; count < parsed.length; count++) {
              var stime = parsed[0].Time;
              var newtime = stime.replace(" ", "T");
              even[count] = {title: parsed[count].Name, start: parsed[count].Time};
          }
          //$("#content").html("<p>"+result+"</p>");
          $("#content").load("components.html #app_cal", function() {
              $("#appointment_calendar").fullCalendar({
                  height: 525,
                  events: even
              });
          });
        }
      }
    });
  });
  $(document).on("click", "#schedule_appointment_patient", function() {
    $("#content").load("components.html #schedule_appointment_for_patient_form", function() {
      $.ajax({
        type: "POST",
        url: "get_patients.php",
        data: "",
        cache: false,
        success: function(result) {
          $("#provider_field").html(result);  
        }
      });
        $("#dtpicker").datepicker({dateFormat: 'dd-mm-yy', minDate: +1});
    });
    $(document).on("change", "#provider_field", function() {
      var provider_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      if (provider_id != "" && date != "") {
        var data_string = "action=view_openings&physician_id=" + provider_id + "&date=" + date;
        $.ajax({
          type: "POST",
          url: "appointments.php",
          data: data_string,
          cache: false,
          success: function(result) {
            if (result == "0") {
              
            }
            else {
              $("#time_field").html(result);
            }
          }        
        });
      }
    });
    $(document).on("change", "#dtpicker", function() {
      var provider_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      if (provider_id != "" && date != "") {
        var data_string = "action=view_openings&physician_id=" + provider_id + "&date=" + date;
        $.ajax({
          type: "POST",
          url: "appointments.php",
          data: data_string,
          cache: false,
          success: function(result) {
            if (result == "0") {
            }
            else {
              $("#time_field").html(result);
            }
          }        
        }); 
      }
      else {
        alert(date + " " + provider_id);  
      }
    });
    /*
    $(document).on("click", "#available_appointments_button", function() {
      var physician_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      var data_string = "action=view_openings&physician_id=" + physician_id + "&date=" + date;
      $.ajax({
        type: "POST",
        url: "appointments.php",
        data: data_string,
        cache: false,
        success: function(result) {
          if (result == "0") {
          }
          else {
            $("#time_field").html(result);
          }
        }        
      });
    });
    */
    $(document).on("click", "#schedule_appointment_button", function() {
      $(document).off("click", "#schedule_appointment_button");
      var physician_id = $("#provider_field").val();
      var datetime = $("#dtpicker").val() + " " + $("#time_field").val();
      var data_string = "action=schedule&physician_id=" + physician_id + "&date=" + datetime;
      if ($("#dtpicker").val() != "" && $("#time_field").val() != "null") {
          $.ajax({
            type: "POST",
            url: "appointments.php",
            data: data_string,
            cache: false,
            success: function(result) {
              if (result == "0") {
                $("#content").html("<p>Could not schedule appointment! <a href='main.html'>Return to the home page.</a></p>");
              }
              else {
                $("#content").html("<p>Appointment scheduled! <a href='main.html'>Return to the home page.</a></p>"); 
              }
            }        
          });
      } else {
          alert("Please choose all options presented.");
      }
    });
  });
  $(document).on("click", "#write_nurse_note", function() {
    $("#content").load("components.html #nurse_note", function() {
          $.ajax({
            type: "POST",
            url: "get_patients.php",
            data: "",
            cache: false,
            success: function(result) {
              $("#patient_field").html(result);  
            }
          });
          $(document).on("click", "#nurse_note_button", function() {
              var text = $("#text_field").val();
              var patient_id = $("#patient_field").val();
                $.ajax({
                    type: "POST",
                    url: "exam_note.php",
                    data: "text="+text+"&patient_id="+patient_id,
                    cache: false,
                    success: function(result) {
                        if (result == 0) {
                            $("#content").html("<p>Could not submit note! <a href='main.html'>Return to the home page.</a></p>"); 
                        } else {
                            $("#content").html("<p>Note recorded! <a href='main.html'>Return to the home page.</a></p>"); 
                        }
                    }
                  });
          });
    });
  });
  $(document).on("click", "#write_phys_note", function() {
    $("#content").load("components.html #phys_note", function() {
          $.ajax({
            type: "POST",
            url: "get_patients.php",
            data: "",
            cache: false,
            success: function(result) {
              $("#patient_field").html(result);  
            }
          });
          $(document).on("click", "#phys_note_button", function() {
              var text = $("#text_field").val();
              var patient_id = $("#patient_field").val();
                $.ajax({
                    type: "POST",
                    url: "exam_note.php",
                    data: "text="+text+"&patient_id="+patient_id,
                    cache: false,
                    success: function(result) {
                        if (result == 0) {
                            $("#content").html("<p>Could not submit note! <a href='main.html'>Return to the home page.</a></p>"); 
                        } else {
                            $("#content").html("<p>Note recorded! <a href='main.html'>Return to the home page.</a></p>"); 
                        }
                    }
                  });
          });
    });
  });
    $(document).on("click", "#view_record", function() {
        $("#content").load("components.html #record", function() {
          $.ajax({
            type: "POST",
            url: "get_record.php",
            data: "",
            cache: false,
            success: function(result) {
                var parsed = JSON.parse(result);
              $("#prescription_content").html(parsed[2]);
              $("#treatment_content").html(parsed[1]);
              $("#symptom_content").html(parsed[0]);
              $("#mr-heading").html("<span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>     Medical Record for "+parsed[3]);
            }
          });
        });
    });
  $(document).on("click", "#schedule_appointment", function() {
    $("#content").load("components.html #schedule_appointment_form", function() {
      $.ajax({
        type: "POST",
        url: "get_providers.php",
        data: "",
        cache: false,
        success: function(result) {
          $("#provider_field").html(result);  
        }
      });
        $("#dtpicker").datepicker({dateFormat: 'dd-mm-yy', minDate: +1});
    });
    $(document).on("change", "#provider_field", function() {
      var provider_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      if (provider_id != "" && date != "") {
        var data_string = "action=view_openings&physician_id=" + provider_id + "&date=" + date;
        $.ajax({
          type: "POST",
          url: "appointments.php",
          data: data_string,
          cache: false,
          success: function(result) {
            if (result == "0") {
              
            }
            else {
              $("#time_field").html(result);
            }
          }        
        });
      }
    });
    $(document).on("change", "#dtpicker", function() {
      var provider_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      if (provider_id != "" && date != "") {
        var data_string = "action=view_openings&physician_id=" + provider_id + "&date=" + date;
        $.ajax({
          type: "POST",
          url: "appointments.php",
          data: data_string,
          cache: false,
          success: function(result) {
            if (result == "0") {
            }
            else {
              $("#time_field").html(result);
            }
          }        
        }); 
      }
      else {
        alert(date + " " + provider_id);  
      }
    });
    /*
    $(document).on("click", "#available_appointments_button", function() {
      var physician_id = $("#provider_field").val();
      var date = $("#dtpicker").val();
      var data_string = "action=view_openings&physician_id=" + physician_id + "&date=" + date;
      $.ajax({
        type: "POST",
        url: "appointments.php",
        data: data_string,
        cache: false,
        success: function(result) {
          if (result == "0") {
          }
          else {
            $("#time_field").html(result);
          }
        }        
      });
    });
    */
    $(document).on("click", "#schedule_appointment_button", function() {
      $(document).off("click", "#schedule_appointment_button");
      var physician_id = $("#provider_field").val();
      var datetime = $("#dtpicker").val() + " " + $("#time_field").val();
      var data_string = "action=schedule&physician_id=" + physician_id + "&date=" + datetime;
      if ($("#dtpicker").val() != "" && $("#time_field").val() != "null") {
          $.ajax({
            type: "POST",
            url: "appointments.php",
            data: data_string,
            cache: false,
            success: function(result) {
              if (result == "0") {
                $("#content").html("<p>Could not schedule appointment! <a href='main.html'>Return to the home page.</a></p>");
              }
              else {
                $("#content").html("<p>Appointment scheduled! <a href='main.html'>Return to the home page.</a></p>"); 
              }
            }        
          });
      } else {
          alert("Please choose all options presented.");
      }
    });
  });
  $(document).on("click", "#prescribe", function() {
      $("#content").load("components.html #prescribe_med_form", function() {
        $.ajax({
            type: "POST",
            url: "get_patients.php",
            data: "",
            cache: false,
            success: function(result) {
              $("#patient_field").html(result);
            }
        });
      });
      $(document).on("click", "#prescribe_button", function() {
          var patient_id = $("#patient_field").val();
          var drug = $("#drug_field").val();
          var qty = $("#quantity_field").val();
          var refills = $("#refills_field").val();
            $.ajax({
                type: "POST",
                url: "prescribe.php",
                data: "patient_id="+patient_id+"&drug="+drug+"&qty="+qty+"&refills="+refills,
                cache: false,
                success: function(result) {
                  $("#content").html(result);
                  if (result == 0) {
                    $("#content").html("<p>Could not prescribe! <a href='main.html'>Return to the home page.</a></p>"); 
                  } else {
                    $("#content").html("<p>Medication prescribed! <a href='main.html'>Return to the home page.</a></p>"); 
                  }
                }
            });
      });
  });
  $(document).on("click", "#create_staff", load_create_staff);
  $(document).on("click", "#cancel_appointment", function() {
    $("#content").load("components.html #cancel_appointment_content", function() {
      $.ajax({
        type: "POST",
        url: "appointments.php",
        data: "action=view",
        cache: false,
        success: function(result) {
          if (result == "0") {
              
          }
          else {
              var parsed = JSON.parse(result);
              var options = [];
              for (var count = 0; count < parsed.length; count++) {
                  options.push('<option value="', parsed[count].AppointmentID, '">', parsed[count].Time + " with " + parsed[count].Name, '</option>');
              }
            $("#cancel_appointment_field").html(options.join(''));
          }
        }        
      });
      $(document).on("submit", "#cancel_appointment_form", function() {
        var appointment_id = $("#cancel_appointment_field").val();
        data_string = "action=cancel&appointment_id=" + appointment_id;
        $.ajax({
          type: "POST",
          url: "appointments.php",
          data: data_string,
          cache: false,
          success: function(result) {
            if (result == "0") {
              alert("Could not cancel appointment!");
            }
            else {
              alert("Appointment canceled!");
            }
          }          
        });        
      });
    });
  });
  $(document).on("click", "#add_symptom", function() {
      $("#content").load("components.html #add_symptom_form", function() {
          $.ajax({
              type: "POST",
              url: "get_patients.php",
              data: "",
              cache: false,
              success: function(result) {
                  $("#patient_field").html(result);
              }          
        });
          $.ajax({
              type: "POST",
              url: "get_symptoms.php",
              data: "",
              cache: false,
              success: function(result) {
                  $("#symptom_field").html(result);
              }          
        });
      });
  });
  $(document).on("click", "#add_treatment", function() {
      $("#content").load("components.html #add_treatment_form", function() {
          $.ajax({
              type: "POST",
              url: "get_patients.php",
              data: "",
              cache: false,
              success: function(result) {
                  $("#patient_field").html(result);
              }          
        });
          $.ajax({
              type: "POST",
              url: "get_treatments.php",
              data: "",
              cache: false,
              success: function(result) {
                  $("#treatment_field").html(result);
              }          
        });
      });
  });
  $(document).on("click", "#view_balance", function() {
    $.ajax({
      type: "POST",
      url: "finances.php",
      data: "action=view",
      cache: false,
      success: function(result) {
        $("#content").html("<h2><span class='glyphicon glyphicon-usd' aria-hidden='true'></span>    View Account Balance</h2><p>Your unpaid balance is $" + result + ".</p><p>To make a payment, talk to a receptionist at your nearest hospital or clinic. Only cash is accepted.</p>");
      }
    });
  });
  $(document).on("click", "#make_payment", function() {
    $("#content").load("components.html #make_payment_content");
    $.ajax({
        type: "POST",
        url: "get_patients.php",
        data: "",
        cache: false,
        success: function(result) {
          $("#patient_field").html(result);
        }
    });
    $(document).on("submit", "#make_payment_form", function(event) {
        $("#pay_submit").prop('disabled', true);
      event.preventDefault();
      var data_string = "action=pay&amount=" + escape($("#amount_input").val()) + "&patient=" + escape($("#patient_field").val());
      $.ajax({
        type: "POST",
        url: "finances.php",
        data: data_string,
        cache: false,
        success: function(result) {
          if (result == "0") {
            alert("Unable to make payment!");
            $("#pay_submit").prop('disabled', false);
          }
          else {
            $("#content").html("<p>Payment made!</p>");
          }
        }        
      });
    });
  });
  $(document).on("click", "#view_prescriptions", function() {
    $.ajax({
      type: "POST",
      url: "prescriptions.php",
      data: "",
      cache: false,
      success: function(result) {
        if (result == "no prescriptions") {
          $("#content").html("<p>You have no prescriptions.</p>");
        }
        else {
          $("#content").html(result);
        }
      }        
    });
  });
}


$(document).ready(function() {
  authenticate();
});
