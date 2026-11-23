<?php
/*
 * Dharani weds Dileep — wedding invitation
 * Anni sections ikkade include avutayi. Order marchalante ee lines ni marchandi.
 * Details marchalante: config.php
 */
require __DIR__ . '/includes/helpers.php';
$c = load_invite_config(__DIR__ . '/config.php');

include __DIR__ . '/includes/head.php';
?>

<body>
    <div class="app" id="app">
        <?php
        include __DIR__ . '/includes/sections/sound-button.php';
        include __DIR__ . '/includes/sections/story.php';       // opening: temple doors + names + gate
        include __DIR__ . '/includes/sections/invite.php';      // Ganesha, couple photo, date
        include __DIR__ . '/includes/sections/countdown.php';   // muhurtham countdown
        include __DIR__ . '/includes/sections/events.php';      // wedding events timeline
        include __DIR__ . '/includes/sections/venue.php';       // venue + map
        include __DIR__ . '/includes/sections/families.php';    // families
        include __DIR__ . '/includes/sections/gallery.php';     // photo stack
        include __DIR__ . '/includes/sections/closing.php';     // live video + sign-off
        include __DIR__ . '/includes/sections/footer.php';      // photographer branding
        ?>
    </div>

    <?php include __DIR__ . '/includes/scripts.php'; ?>
</body>

</html>
