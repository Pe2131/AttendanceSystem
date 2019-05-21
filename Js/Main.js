function GetData(CardNumber, IsEnter) {
    dateOftoday = GetTodayDate();
    console.log(CardNumber + '-' + IsEnter + '-' + dateOftoday);
    emptyModal();
    $.ajax({
        type: 'POST',
        url: 'http://10.30.30.220:9001/Hr/WebAttendanceClock/SubmitAttendance/?CardNumber=' + CardNumber + '&IsEnter=' + IsEnter + '&DateTime=' + dateOftoday,
        error: function() {
            console.log('300');
            $("#errorModal").modal('show');
            window.setTimeout(function() { clearModal(); }, 3000); //modal hide
            $('#id').val('');
            $("#id").focus().on('blur', function() {
                $(this).focus();
            });
        },
        success: function(data) {
            var temp = JSON.stringify(data);
            var jsonData = JSON.parse(temp);
            console.log('*' + jsonData.Code);
            if (jsonData.Code == 200) {
                console.log(jsonData.Message);
                var result = jsonData.Message;
                console.log(result["EmployeeId"]);
                console.log(result.FirstName);
                $("#idspan").text(result["EmployeeId"]);
                $("#namespan").text(result.FirstName);
                $("#familispan").text(result.LastName);
                $("#stagespan").text(result.StageName);
                greeting(IsEnter);
                $("#myModal").modal('show');
                window.setTimeout(function() { clearModal(); }, 3000); //modal hide
                $('#id').val('');
                $("#id").focus().on('blur', function() {
                    $(this).focus();
                });
            }
        },
        contentType: "application/json",
        dataType: 'json'
    });
    /*
        $.getJSON("http://10.30.30.220:9001/Hr/WebAttendanceClock/SubmitAttendance/?CardNumber=" + CardNumber + "&IsEnter=" + IsEnter + "&DateTime=" + dateOftoday, function(res) {
            if (res != null) {
                var temp = JSON.stringify(res);
                var jsonData = JSON.parse(temp);
                console.log(res);
                // var result = jsonData.Message[0];
                // console.log(result);
            }
        });*/
}

function GetTodayDate() {
    var today = new Date();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var hour = ("0" + today.getHours()).slice(-2);
    var minute = ("0" + today.getMinutes()).slice(-2);
    var seccond = ("0" + today.getSeconds()).slice(-2);
    var formattedtoday = today.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seccond;
    return formattedtoday;
}

function emptyModal() {
    window.clearTimeout();
    $("#myModal").modal('hide');
    $(".modal-fade").modal("hide");
    $(".modal-backdrop").remove();
    $("#idspan").text(''); // clear the text
    $("#namespan").text('');
    $("#familispan").text('');
    $("#stagespan").text('');

}

function clearModal() {
    window.clearTimeout();
    $("#myModal").modal('hide');
    $("#errorModal").modal('hide');
    $(".modal-fade").modal("hide");
    $(".modal-backdrop").remove();
    $('#id').val('');
    $("#id").focus().on('blur', function() {
        $(this).focus();
    });
}

function greeting(isenter) {
    var today = new Date();
    var hour = ("0" + today.getHours()).slice(-2);
    var minute = ("0" + today.getMinutes()).slice(-2);
    var t = hour + ':' + minute;
    if (isenter === 'true') {
        $('#enterexit').text('');
        $('#enterexit').attr('style', 'color:#3da207;');
        $('#enterexit').text('Enter');
        $('#time').text('');
        $('#time').attr('style', 'color:#3da207;');
        $('#time').text(t);
        $('#mot').text('');
        $('#mot').attr('style', 'font-size:20px;');
        $('#mot').text('Have a Great Shift');
    } else {
        $('#enterexit').text('');
        $('#enterexit').attr('style', 'color:red;');
        $('#enterexit').text('Exit');
        $('#time').text('');
        $('#time').attr('style', 'color:red;');
        $('#time').text(t);
        $('#mot').text('');
        $('#mot').attr('style', 'font-size:18px;');
        $('#mot').text('Enjoy Your Rest Time');
    }

}