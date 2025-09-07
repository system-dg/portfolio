$(document).ready(function() {
    $('.pic').on('click', function() {
        let imgSrc = $(this).find('img').attr('src');
        $('body').append(`
            <div class="lightbox">
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Lightbox Image">
                </div>
            </div>
        `);
        $('.lightbox').on('click', function() {
            $(this).remove();
        });
    });
});
