Dropzone.autoDiscover = false;
$(function () {
    $('.dropzone[data-limit="1"]').dropzone({
        url: '/application/classes/sub-classes/ajax-upload.php',
        maxFiles: 1,
        init: function () {
            this.on("success", function (file, response) {
                console.log(response);
                $('input[name="' + this.element.dataset.child + '"]').val(response);
            });
            this.on("error", function (file, error, xhr) {
                console.log(error);
            });
        }
    });
})