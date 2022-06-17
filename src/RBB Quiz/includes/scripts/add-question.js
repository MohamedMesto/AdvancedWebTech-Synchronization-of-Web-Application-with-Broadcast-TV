$(document).ready(function() {
    $('#add_question_form').submit(function(e){
        e.preventDefault();
        
        $.ajax({ 
            dataType: 'json',
            type: 'post',
            data: {
                action: 'submit_question_form',
                number: $("#question_number").val(),
                number_of_answers: $("#number_of_answers").val(),
                correct_ans: $('input[name="answer"]:checked').val(),
                start_time_minute: $("#start_min").val(),
                start_time_second: $("#start_sec").val(),
                end_time_minute: $("#end_min").val(),
                end_time_second: $("#end_sec").val(),
                cost: $("#question_score").val()
            },
            url: ajaxurl,
            success: function(data) {
                $(".msgDiv").html(data.data.message);
                if (data.data.status == 1) {
                    document.getElementById("add_question_form").reset();
                }
            },
            error: function(err) {
                $(".msgDiv").html(data.data.message);
            }
        });
    });
});
