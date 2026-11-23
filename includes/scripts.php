<?php /* config.php nunchi JS ki data pampistundi, taruvata main.js run avutundi */ ?>
    <script>
        window.INVITE_CONFIG = <?= json_encode($c, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;
    </script>
    <script src="assets/js/main.js?v=<?= filemtime(__DIR__ . '/../assets/js/main.js') ?>"></script>
