$(document).ready(function () {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        const target = $(this.getAttribute("href"));
        if (target.length) {
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: target.offset().top - 100,
                    },
                    1000
                );
        }
    });

    // Header scroll effect
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 100) {
            $(".header").addClass("scrolled");
        } else {
            $(".header").removeClass("scrolled");
        }
    });

    // Mobile menu toggle
    $(".mobile-menu-toggle").on("click", function () {
        $(".nav-menu").slideToggle(300);
        $(this).find("i").toggleClass("fa-bars fa-times");
    });

    // Close mobile menu when clicking outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".navbar").length) {
            if ($(window).width() <= 768) {
                $(".nav-menu").slideUp(300);
                $(".mobile-menu-toggle i").removeClass("fa-times").addClass("fa-bars");
            }
        }
    });

    // Counter animation
    function animateCounter() {
        $(".stat-item strong").each(function () {
            const $this = $(this);
            const countTo = $this.text();

            // Check if it's a percentage
            const isPercent = countTo.includes("%");
            const numValue = parseInt(countTo.replace(/\D/g, ""));

            $({ countNum: 0 }).animate(
                {
                    countNum: numValue,
                },
                {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        if (isPercent) {
                            $this.text(Math.floor(this.countNum) + "%");
                        } else if (numValue >= 1000) {
                            $this.text(Math.floor(this.countNum).toLocaleString() + "+");
                        } else {
                            $this.text(Math.floor(this.countNum));
                        }
                    },
                    complete: function () {
                        if (isPercent) {
                            $this.text(numValue + "%");
                        } else {
                            $this.text(countTo);
                        }
                    },
                }
            );
        });
    }

    // Trigger counter animation when in viewport
    let counterAnimated = false;
    $(window).on("scroll", function () {
        const statsSection = $(".stats");
        if (statsSection.length && !counterAnimated) {
            const statsTop = statsSection.offset().top;
            const statsBottom = statsTop + statsSection.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (viewportBottom > statsTop && viewportTop < statsBottom) {
                animateCounter();
                counterAnimated = true;
            }
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $(".project-card, .category-card, .feature-card, .service-item, .team-card, .news-card").each(function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (viewportBottom > elementTop + 100 && viewportTop < elementBottom) {
                $(this).addClass("animate-in");
            }
        });
    }

    // Add CSS for animation
    $("<style>")
        .text(
            `
      .project-card, .category-card, .feature-card, .service-item, .team-card, .news-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .header.scrolled {
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
      }
    `
        )
        .appendTo("head");

    // Trigger animation on page load and scroll
    animateOnScroll();
    $(window).on("scroll", animateOnScroll);

    // Filter items animation
    $(".filter-item").on("click", function () {
        $(".filter-item").removeClass("active");
        $(this).addClass("active");

        // Add active state styling
        if (!$("style#filter-active").length) {
            $('<style id="filter-active">')
                .text(
                    `
          .filter-item.active {
            background: white !important;
            color: #494C53 !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }
        `
                )
                .appendTo("head");
        }
    });

    // Project card hover effect
    $(".project-card").hover(
        function () {
            $(this).find(".btn-detail").text("Xem ngay");
        },
        function () {
            $(this).find(".btn-detail").text("Chi tiết");
        }
    );

    $(".btn-settings").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".advanced-search").toggleClass("active");

        // Smooth scroll to advanced search when opening
        if ($(".advanced-search").hasClass("active")) {
            setTimeout(function () {
                $("html, body").animate(
                    {
                        scrollTop: $(".advanced-search").offset().top - 120,
                    },
                    500
                );
            }, 100);
        }
    });

    // Filter buttons toggle
    $(".filter-btn:not(.open-modal)").on("click", function () {
        $(this).toggleClass("active");
    });

    // Open Modal
    $(".open-modal").on("click", function (e) {
        e.preventDefault();
        const modalType = $(this).data("modal");

        if (modalType === "price") {
            $("#priceModal").addClass("active");
        } else if (modalType === "amenities") {
            $("#amenitiesModal").addClass("active");
        } else if (modalType === "services") {
            $("#services").addClass("active");
        } else if (modalType === "bookingModal") {
            $("#bookingModal").addClass("active");
        } else if (modalType === "furniture") {
            $("#furniture").addClass("active");
        }

        // Prevent body scroll
        $("body").css("overflow", "hidden");
    });

    // Close Modal
    $(".modal-close, .modal-overlay").on("click", function (e) {
        if ($(e.target).hasClass("modal-overlay") || $(e.target).closest(".modal-close").length) {
            $(".modal-overlay").removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    // Prevent modal content click from closing
    $(".modal-content").on("click", function (e) {
        e.stopPropagation();
    });

    // ESC key to close modal
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            $(".modal-overlay").removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    // Price option select
    $(".price-option").on("click", function () {
        $(".price-option").removeClass("selected");
        $(this).addClass("selected");
    });

    // Amenity option select (multiple)
    $(".amenity-option").on("click", function () {
        $(this).toggleClass("selected");
    });

    // Modal submit button
    $(".btn-modal-submit").on("click", function () {
        const $modal = $(this).closest(".modal-overlay");
        $modal.removeClass("active");
        $("body").css("overflow", "auto");

        // Get selected values
        if ($modal.attr("id") === "priceModal") {
            const selected = $(".price-option.selected").text();
            if (selected) {
                showNotification("✓ Đã chọn giá: " + selected);
                // Update the filter button text
                $('.open-modal[data-modal="price"]').html(`Giá: ${selected} <i class="fas fa-chevron-down"></i>`);
            }
        } else if ($modal.attr("id") === "amenitiesModal") {
            const selected = $(".amenity-option.selected")
                .map(function () {
                    return $(this).text();
                })
                .get();

            if (selected.length > 0) {
                showNotification("✓ Đã chọn " + selected.length + " tiện ích");
                $('.open-modal[data-modal="amenities"]').html(
                    `Tiện ích (${selected.length}) <i class="fas fa-chevron-down"></i>`
                );
            }
        }
    });

    // Main search button
    $(".btn-search-main").on("click", function () {
        // Collect all selected filters
        const activeFilters = [];

        $(".filter-btn.active").each(function () {
            activeFilters.push($(this).text().trim());
        });

        const priceSelected = $(".price-option.selected").text();
        if (priceSelected) {
            activeFilters.push("Giá: " + priceSelected);
        }

        const amenitiesCount = $(".amenity-option.selected").length;
        if (amenitiesCount > 0) {
            activeFilters.push(amenitiesCount + " tiện ích");
        }

        if (activeFilters.length > 0) {
            showNotification("🔍 Tìm kiếm với: " + activeFilters.join(", "));
            console.log("Search with filters:", activeFilters);
        } else {
            showNotification("Vui lòng chọn ít nhất 1 bộ lọc");
        }
    });

    // Show notification function
    function showNotification(message) {
        const $notification = $("<div>")
            .html(message)
            .css({
                position: "fixed",
                top: "100px",
                right: "20px",
                background: "#8ECA48",
                color: "white",
                padding: "15px 25px",
                "border-radius": "10px",
                "box-shadow": "0 5px 20px rgba(0, 0, 0, 0.2)",
                "z-index": "9999",
                animation: "slideInRight 0.5s ease",
                "max-width": "400px",
                "line-height": "1.5",
            })
            .appendTo("body");

        setTimeout(function () {
            $notification.css("animation", "fadeOut 0.5s ease");
            setTimeout(function () {
                $notification.remove();
            }, 500);
        }, 3000);
    }

    // Add animations if not exist
    if (!$("style#notification-animations").length) {
        $('<style id="notification-animations">')
            .text(
                `
            @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
            }
            @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(400px);
            }
            }
        `
            )
            .appendTo("head");
    }

    console.log("Hero Search Filter - Initialized");
});

// Search box focus effect
$(".search-box input, .search-box .search-select")
    .on("focus", function () {
        $(this).parent().css("box-shadow", "0 8px 40px rgba(142, 202, 72, 0.3)");
    })
    .on("blur", function () {
        $(this).parent().css("box-shadow", "0 5px 30px rgba(0, 0, 0, 0.15)");
    });

// Search select change effect
$(".search-select").on("change", function () {
    if ($(this).val() !== $(this).find("option:first").val()) {
        $(this).css("color", "#8ECA48");
    } else {
        $(this).css("color", "#2c3e50");
    }
});

// Price range slider
let minPrice = 0;
let maxPrice = 100000000000;

function formatPrice(price) {
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + " tỷ";
    } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + " triệu";
    } else if (price > 0) {
        return price.toLocaleString() + "đ";
    }
    return "0đ";
}

$(".range-min").on("input", function () {
    minPrice = parseInt($(this).val());
    if (minPrice > maxPrice) {
        minPrice = maxPrice;
        $(this).val(minPrice);
    }
    updatePriceDisplay();
});

$(".range-max").on("input", function () {
    maxPrice = parseInt($(this).val());
    if (maxPrice < minPrice) {
        maxPrice = minPrice;
        $(this).val(maxPrice);
    }
    updatePriceDisplay();
});

function updatePriceDisplay() {
    $(".price-value").text(formatPrice(minPrice) + " - " + formatPrice(maxPrice));
}

// Amenity checkbox effect
$('.amenity-item input[type="checkbox"]').on("change", function () {
    if ($(this).is(":checked")) {
        $(this).parent().css("background", "#f0f9e8");
    } else {
        $(this).parent().css("background", "transparent");
    }
});

// Load more button effect
$(".btn-loadmore").on("click", function () {
    const $btn = $(this);
    const originalText = $btn.text();

    $btn.text("Đang tải...").prop("disabled", true);

    // Simulate loading
    setTimeout(function () {
        $btn.text(originalText).prop("disabled", false);

        // Show success message
        const $message = $("<div>")
            .text("✓ Đã tải thêm nội dung")
            .css({
                position: "fixed",
                top: "100px",
                right: "20px",
                background: "#8ECA48",
                color: "white",
                padding: "15px 25px",
                "border-radius": "10px",
                "box-shadow": "0 5px 20px rgba(0, 0, 0, 0.2)",
                "z-index": "9999",
                animation: "slideInRight 0.5s ease",
            })
            .appendTo("body");

        // Add animation keyframes
        if (!$("style#notification-animation").length) {
            $('<style id="notification-animation">')
                .text(
                    `
            @keyframes slideInRight {
              from {
                transform: translateX(400px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes fadeOut {
              to {
                opacity: 0;
                transform: translateX(400px);
              }
            }
          `
                )
                .appendTo("head");
        }

        setTimeout(function () {
            $message.css("animation", "fadeOut 0.5s ease");
            setTimeout(function () {
                $message.remove();
            }, 500);
        }, 2000);
    }, 1500);
});

// Category card click effect
$(".category-card").on("click", function () {
    const category = $(this).find("h3").text();
});

// Project detail button
$(".btn-detail").on("click", function (e) {
    e.stopPropagation();
    const projectName = $(this).closest(".project-card").find("h3").text();
});

$(".social-links a").hover(
    function () {
        $(this).css("transform", "translateY(-5px) rotate(360deg)");
    },
    function () {
        $(this).css("transform", "translateY(0) rotate(0deg)");
    }
);

$(".team-card")
    .on("mousemove", function (e) {
        const card = $(this);
        const rect = card[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.css("transform", `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`);
    })
    .on("mouseleave", function () {
        $(this).css("transform", "");
    });

$(".feature-card").each(function (index) {
    $(this).css("transition-delay", index * 0.1 + "s");
});

$(".service-item").each(function (index) {
    $(this).css("transition-delay", index * 0.1 + "s");
});

$(".price").each(function () {
    const price = $(this).text();
    if (!price.includes("tỷ") && !price.includes("triệu")) {
    }
});

// View Toggle (Grid/List)
$(".view-btn").on("click", function () {
    $(".view-btn").removeClass("active");
    $(this).addClass("active");

    const view = $(this).data("view");
    if (view === "list") {
        $(".properties-grid").addClass("list-view");
    } else {
        $(".properties-grid").removeClass("list-view");
    }
});

$("<style>")
    .text(
        `
      .properties-grid.list-view {
        grid-template-columns: 1fr;
      }
      .properties-grid.list-view .property-card {
        display: flex;
        flex-direction: row;
      }
      .properties-grid.list-view .property-image {
        width: 350px;
        height: 250px;
        flex-shrink: 0;
      }
      .properties-grid.list-view .property-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      @media (max-width: 768px) {
        .properties-grid.list-view .property-card {
          flex-direction: column;
        }
        .properties-grid.list-view .property-image {
          width: 100%;
          height: 240px;
        }
      }
    `
    )
    .appendTo("head");

// Gallery Slider
let currentSlide = 0;
const slides = $(".gallery-item");
const totalSlides = slides.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    $(".gallery-dots").append(`<span class="dot ${i === 0 ? "active" : ""}" data-slide="${i}"></span>`);
}

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.removeClass("active");
    slides.eq(currentSlide).addClass("active");

    $(".gallery-dots .dot").removeClass("active");
    $(`.gallery-dots .dot[data-slide="${currentSlide}"]`).addClass("active");
}

// Gallery controls
$(".gallery-next").on("click", function () {
    showSlide(currentSlide + 1);
});

$(".gallery-prev").on("click", function () {
    showSlide(currentSlide - 1);
});

$(".gallery-dots").on("click", ".dot", function () {
    const slideIndex = parseInt($(this).data("slide"));
    showSlide(slideIndex);
});

// Auto slide
setInterval(function () {
    showSlide(currentSlide + 1);
}, 5000);

// Keyboard navigation
$(document).on("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        showSlide(currentSlide - 1);
    } else if (e.key === "ArrowRight") {
        showSlide(currentSlide + 1);
    }
});

// Quick contact form
$(".quick-contact-form").on("submit", function (e) {
    e.preventDefault();

    const $submitBtn = $(this).find(".btn-submit");
    const originalText = $submitBtn.text();

    $submitBtn.text("Đang gửi...").prop("disabled", true);

    setTimeout(function () {
        $(".quick-contact-form")[0].reset();
        $submitBtn.text(originalText).prop("disabled", false);
        showNotification("✓ Gửi tin nhắn thành công!");
    }, 1500);
});

// Show notification
function showNotification(message) {
    const $notification = $("<div>")
        .text(message)
        .css({
            position: "fixed",
            top: "100px",
            right: "20px",
            background: "#8ECA48",
            color: "white",
            padding: "15px 25px",
            "border-radius": "10px",
            "box-shadow": "0 5px 20px rgba(0, 0, 0, 0.2)",
            "z-index": "9999",
            animation: "slideInRight 0.5s ease",
        })
        .appendTo("body");

    setTimeout(function () {
        $notification.css("animation", "fadeOut 0.5s ease");
        setTimeout(function () {
            $notification.remove();
        }, 500);
    }, 3000);
}

// Play video
$(".play-button").on("click", function () {
    console.log("Play video");
    showNotification("Video sẽ được phát...");
});

// Photo gallery lightbox
$(".photo-grid img").on("click", function () {
    const src = $(this).attr("src");
    const $lightbox = $("<div>")
        .addClass("lightbox")
        .css({
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.9)",
            "z-index": "10000",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            cursor: "pointer",
        })
        .append(`<img src="${src}" style="max-width: 90%; max-height: 90%; border-radius: 12px;">`)
        .appendTo("body");

    $lightbox.on("click", function () {
        $(this).fadeOut(300, function () {
            $(this).remove();
        });
    });
});

// Map link
$(".map-link a").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
        {
            scrollTop: $(".map-section-detail").offset().top - 100,
        },
        800
    );
});

// Stagger animation
$(".property-header, .utilities-grid, .detailed-info, .amenities-checklist").each(function (index) {
    $(this).css("transition-delay", index * 0.1 + "s");
});

// Copy info on click
$(".info-item .value, .util-value, .price-value").on("click", function () {
    const text = $(this).text();
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    showNotification("✓ Đã sao chép: " + text);
});

// Print button
$(document).on("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        window.print();
    }
});

// Icon box hover
$(".icon-box").hover(
    function () {
        $(this).find("i").css("transform", "scale(1.2) rotate(5deg)");
    },
    function () {
        $(this).find("i").css("transform", "scale(1) rotate(0deg)");
    }
);

$("<style>")
    .text(
        `
      .amenity-badge.selected {
        background: #8ECA48 !important;
        color: white !important;
      }
      .amenity-badge.selected i {
        color: white !important;
      }
    `
    )
    .appendTo("head");

// Gallery touch swipe
let touchStartX = 0;
let touchEndX = 0;

$(".property-gallery").on("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
});

$(".property-gallery").on("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        showSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + 50) {
        showSlide(currentSlide - 1);
    }
}

// Sidebar sticky scroll
$(window).on("scroll", function () {
    if ($(".detail-sidebar").length) {
        const scrollTop = $(window).scrollTop();
        const sidebarTop = $(".detail-sidebar").offset().top - 110;

        if (scrollTop > sidebarTop) {
            $(".sidebar-sticky").addClass("is-sticky");
        } else {
            $(".sidebar-sticky").removeClass("is-sticky");
        }
    }
});
