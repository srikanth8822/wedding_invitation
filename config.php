
<?php
/*
 * ======== Doppalapudi Wedding Invitation ========
 * All invitation details are maintained here.
 */

return [
    'sample'        => false,

    // Couple Details
    'groom'         => 'Harsha Vardhan',
    'bride'         => 'Lakshmi Prasanna',

    // Wedding Date & Time
    'dateText'      => 'Thursday · 3 December 2026',
    'dateShort'     => '03 · 12 · 2026',
    'city'          => 'Turkayamjal, Hyderabad',

    'muhurtham'     => '2026-12-03T21:16:00+05:30',
    'muhurthamText' => '9:16 PM',

    // Photos (assets folder)
    'heroPhoto'     => 'assets/couple-photo.png',
    'heroCaption'   => 'Better Together',
    'ganeshaPhoto'  => 'assets/vinayaka.webp',
    'mantra'        => 'ఓం శ్రీ గణేశాయ నమః',
    'graceLine'     => 'With the grace of Lord Ganesha',

    // Events
    'events' => [
        [
            'name'  => 'Wedding',
            'date'  => 'Thursday, 3 December 2026',
            'time'  => '9:16 PM',
            'venue' => 'Parinaya Conventions, Turkayamjal',
            'map'   => '',
        ],
        [
            'name'  => 'Reception',
            'date'  => 'Saturday, 5 December 2026',
            'time'  => '12:00 PM onwards',
            'venue' => 'Grand Goutham Hotel, Saptapadi Hall, Tenali',
            'map'   => '',
        ],
    ],

    // Wedding Venue
    'venueName'     => 'Parinaya Conventions',
    'venueLine'     => 'Turkayamjal, Tarur, Hyderabad, Telangana',
    'mapQuery'      => 'Parinaya Conventions, Turkayamjal, Hyderabad, Telangana',
    'mapUrl'        => '',
    'venuePhoto'    => 'assets/venue-cover.webp',
    'closingPhoto'  => 'assets/live-thumb.webp',
    'mapZoom'       => 15,

    // Groom Family
    'groomFamily' => [
        [
            'role' => 'Father',
            'name' => 'Doppalapudi Surya Naga Malleswara Rao',
        ],
        [
            'role' => 'Mother',
            'name' => 'Saritha',
        ],
        [
            'role' => 'Grandfather',
            'name' => 'Doppalapudi Sambasiva Rao',
        ],
        [
            'role' => 'Grandmother',
            'name' => 'Barathi Ranga',
        ],
    ],

    // Bride Family
    'brideFamily' => [
        [
            'role' => 'Father',
            'name' => 'Koneru Srinivas',
        ],
        [
            'role' => 'Mother',
            'name' => 'Madhuravani',
        ],
    ],

    // Gallery
    'gallery' => [
        [
            'src' => 'assets/1.jpg',
            'alt' => 'Harsha Vardhan and Lakshmi Prasanna',
            'pos' => '50% 50%',
        ],
        [
            'src' => 'assets/2.jpg',
            'alt' => 'Wedding couple',
            'pos' => '50% 50%',
        ],
        [
            'src' => 'assets/4.jpg',
            'alt' => 'Couple together',
            'pos' => '50% 50%',
        ],
        [
            'src' => 'assets/3.jpg',
            'alt' => 'Wedding ring',
            'pos' => '50% 50%',
        ],
    ],

    'albumUrl' => '',

    // Branding
    'brandName'      => 'Tharun Captures',
    'brandInstagram' => '@tharun_captures',
    'brandPhone'     => '9515327032',
    'brandEmail'     => 'tharuncaptures@gmail.com',
    'brandWebsite'   => '',

    // Live Video
    'youtubeUrl' => '',
    'videoTitle' => 'Watch our wedding live',

    // Background Music
    'music' => 'assets/vacindi.mpeg',

    // SEO / WhatsApp Share
    'siteUrl'         => '',
    'ogImage'         => 'og-couple.jpg',
    'metaDescription' => 'Wedding invitation of Harsha Vardhan and Lakshmi Prasanna on Thursday, 3 December 2026 at Parinaya Conventions, Turkayamjal, Hyderabad.',
    'themeColor'      => '#5A0F1B',
];
