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

// PREVENT POST DATA AFTER RESET
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}


// EXCEL EXPORT
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function createPDF(file) {
  $("#players").tableHTMLExport({

    // csv, txt, json, pdf
    type:'pdf',

    // file name
    filename:file,

    ignoreColumns: '.ignore',
    ignoreRows: '.ignore'

    });
}

// DATATABLE
$(document).ready( function () {
    $('table').DataTable();
});
