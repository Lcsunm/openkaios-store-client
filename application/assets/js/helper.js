function notify(param_title, param_text, param_silent, requireInteraction) {

    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: requireInteraction


    }

    var action = {
        actions: [{
            action: 'archive',
            title: 'Archive'
        }]
    }




    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(param_title, options);



    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(param_title, options, action);

            }
        });
    }

}



//silent notification
function toaster(text, time) {


    $("div#toast").html(text)

    $("div#toast").animate({ top: "0px" }, 1000, "linear", function() {
        $("div#toast").delay(time).animate({ top: "-110vh" }, 1000);

    });

}


//check if internet connection 
function check_iconnection() {


    if (navigator.onLine) {


    } else {
        toaster("No Internet connection");
    }
}


//wake up screen
function screenWakeLock(param1) {
    if (param1 == "lock") {
        lock = window.navigator.requestWakeLock("screen");

        lock.onsuccess = function() {
            toaster("screen-lock", 10000);

        };

        lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }

    if (param1 == "unlock") {
        if (lock.topic == "screen") {
            lock.unlock();
        }
    }
}