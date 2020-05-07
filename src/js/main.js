document.addEventListener("DOMContentLoaded", function(event) {
    
    // Анимация на первом экране
    // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
    window.addEventListener("load", function(e) {
        
            $preloader = $('.preloader'),
            $loader = $preloader.find('.prePreloader');
            $loader.fadeOut();
            $preloader.delay(350).fadeOut('slow');

            AOS.init({
              // Global settings:
              disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
              startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
              initClassName: 'aos-init', // class applied after initialization
              animatedClassName: 'aos-animate', // class applied on animation
              useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
              disableMutationObserver: false, // disables automatic mutations' detections (advanced)
              debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
              throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
              
            
              // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
              offset: -200, // offset (in px) from the original trigger point
              delay: 0, // values from 0 to 3000, with step 50ms
              duration: 1000, // values from 0 to 3000, with step 50ms
              easing: 'ease', // default easing for AOS animations
              once: true, // whether animation should happen only once - while scrolling down
              mirror: false, // whether elements should animate out while scrolling past them
              anchorPlacement: 'bottom-center', // defines which position of the element regarding to window should trigger the animation
            
            });

            // LazyLoad загрузка
            var lazyLoadInstance = new LazyLoad({
                elements_selector: ".lazy"
                // ... more custom settings?
            });

            // Слик слайдер на первом экране
            $(document).ready(function(){
                $('.header-slider').slick({
                    dots: true,
                    infinite: true,
                    arrows: false,
                    fade: true,
                    speed: 400,
                    autoplay: true,
                    autoplaySpeed: 4000
                });
            }); 

            // Гамбургер меню (Готово)

            const hamburgerIcon = document.querySelector('.header-humburger');
            const hamburgerMenu = document.querySelector('.menu');
            const closeBtn = document.querySelector('.menu-close'); 
            hamburgerIcon.addEventListener('click', () => {
                document.body.style.overflow = 'hidden';
                hamburgerMenu.style.right = '0';
            });
            closeBtn.addEventListener('click', () => {
                hamburgerMenu.style.right = '-100%';
                document.body.style.overflow = 'auto';
            });
            
            // Портфолио(табы) (Готово)

            let jsTriggers = document.querySelectorAll('.portfolio-tab_trigger');

            jsTriggers.forEach(function(trigger) {
                trigger.addEventListener('click', function()  {
                    let id = this.getAttribute('data-tab'),
                        content = document.querySelector('.portfolio-tab_content[data-tab="'+id+'"]'),
                        activeTrigger = document.querySelector('.portfolio-tab_trigger.active'),
                        activeContent = document.querySelector('.portfolio-tab_content.active');
                    
                    activeTrigger.classList.remove('active');
                    trigger.classList.add('active');
                    
                    activeContent.classList.remove('active');
                    content.classList.add('active');
                });
                trigger.addEventListener('mouseenter', function() {
                    let id = this.getAttribute('data-tab'),
                    content = document.querySelectorAll('.portfolio-tab_content[data-tab="'+id+'"] a')
                    let title = document.querySelectorAll('.portfolio-tabs_title span')[id-1]
                    title.style.display = 'block'
                    title.innerHTML = content.length
                })
                trigger.addEventListener('mouseleave', function() {
                    let id = this.getAttribute('data-tab'),
                        title = document.querySelectorAll('.portfolio-tabs_title span')[id-1]
                    title.style.display = 'none'
                })
            });

            // Калькулятор стоимости сайта (Готово)

            function calc() {
                let getRadioGroupValue = document.querySelectorAll('.calc-radio')
                let sum = 0;
                let radio1sum = 0;
                getRadioGroupValue.forEach((item) => {
                    item.addEventListener('click', (radio) => {
                        if (radio.target.checked && radio.target.name === 'radio3') {
                            sum += +radio.target.value 
                            document.querySelector('.calc-price_cms span').style.display = 'none'
                            console.log(document.querySelector('.calc-price_cms-options').innerHTML)
                            document.querySelector('.calc-price_cms-options').innerHTML += `<span>${radio.target.dataset.name}</span>`
                        } else if (radio.target.checked && radio.target.name === 'radio1'){
                            radio1sum = radio.target.value
                            document.querySelector('.calc-price_type span').innerHTML = radio.target.dataset.name
                        } else if (radio.target.checked && radio.target.name === 'radio2') {
                            radio1sum = radio.target.value
                            document.querySelector('.calc-price_design span').innerHTML = radio.target.dataset.name
                        } else {
                            sum -= +radio.target.value
                            let text = document.querySelector('.calc-price_cms-options').innerHTML
                            let newText = text.replace(`<span>${radio.target.dataset.name}</span>`, '')
                           
                            document.querySelector('.calc-price_cms-options').innerHTML = newText
                            console.log(document.querySelector('.calc-price_cms-options').innerHTML)
                            if (document.querySelector('.calc-price_cms-options').innerHTML === 'NaN') {
                                document.querySelector('.calc-price_cms-options').innerHTML = ''
                            }
                            if (document.querySelector('.calc-price_cms-options').innerHTML.length === 0) {
                                document.querySelector('.calc-price_cms span').style.display = 'block'
                            }
                        }
                        let Allsum = +radio1sum + +sum
                        document.querySelector('.calc-price_all span').innerHTML = Allsum
                    })
                    
                })
                document.querySelector('.calc-price_clear').addEventListener('click', () => {
                    document.querySelector('.calc-price_all span').innerHTML = 0
                    document.querySelector('.calc-price_cms-options').innerHTML = ''
                    document.querySelector('.calc-price_cms span').style.display = 'block'
                    document.querySelector('.calc-price_design span').innerHTML = 'Не выбранно'
                    document.querySelector('.calc-price_type span').innerHTML = 'Не выбранно'
                    document.querySelectorAll('.calc-radio').forEach((item) => {
                        item.checked = false
                    })
                })
            }
            calc()

            // Модальное окно калькулятора (Готово)

            function modalWindowCalc() {
                const calcBtn = document.querySelector('.calc-price_buy'),
                    modalWindow = document.querySelector('.modal'),
                    closeModalWindow = document.querySelector('.modal-window_close'),
                    modalOptType = document.querySelector('.options-price_type span'),
                    modalOptDes = document.querySelector('.options-price_design span'),
                    modalOptCms = document.querySelector('.options-price_cms-options'),
                    modalPrice = document.querySelector('.options-price_all span'),
                    modalOptionsClear = document.querySelector('.options-price_clear')
                calcBtn.addEventListener('click', () => {
                    modalOptType.innerHTML = document.querySelector('.calc-price_type span').innerHTML
                    modalOptDes.innerHTML = document.querySelector('.calc-price_design span').innerHTML
                    if (document.querySelector('.calc-price_cms-options').innerHTML.length > 0) {
                        document.querySelector('.options-price_cms span').style.display = 'none'
                        modalOptCms.innerHTML = document.querySelector('.calc-price_cms-options').innerHTML
                    }
                    modalPrice.innerHTML = document.querySelector('.calc-price_all span').innerHTML
                    modalWindow.classList.add('visibility-on')
                    modalWindow.classList.remove('visibility-off')
                })
                closeModalWindow.addEventListener('click', () => {
                    modalWindow.classList.add('visibility-off')
                    modalWindow.classList.remove('visibility-on')
                })
               modalOptionsClear.addEventListener('click', () => {
                    document.querySelector('.calc-price_all span').innerHTML = 0
                    document.querySelector('.calc-price_cms-options').innerHTML = ''
                    document.querySelector('.calc-price_cms span').style.display = 'block'
                    document.querySelector('.calc-price_design span').innerHTML = 'Не выбранно'
                    document.querySelector('.calc-price_type span').innerHTML = 'Не выбранно'
                    document.querySelector('.options-price_cms-options').innerHTML = ''
                    document.querySelector('.options-price_cms span').style.display = 'block'
                    document.querySelector('.options-price_design span').innerHTML = 'Не выбранно'
                    document.querySelector('.options-price_type span').innerHTML = 'Не выбранно'
                    modalPrice.innerHTML = document.querySelector('.calc-price_all span').innerHTML
                    document.querySelectorAll('.calc-radio').forEach((item) => {
                        item.checked = false
                    })
                })
            }
            modalWindowCalc()

            function valueFormation() {
                if (window.innerWidth > 460) {
                    document.querySelector('.price-block_first').addEventListener('mouseenter', () => {
                        document.querySelector('.price-block_first-desc').style.opacity = 1
                    })
                    document.querySelector('.price-block_first').addEventListener('mouseleave', () => {
                        document.querySelector('.price-block_first-desc').style.opacity = 0
                    })
                    document.querySelector('.price-block_second').addEventListener('mouseenter', () => {
                        document.querySelector('.price-block_second-desc').style.opacity = 1
                    })
                    document.querySelector('.price-block_second').addEventListener('mouseleave', () => {
                        document.querySelector('.price-block_second-desc').style.opacity = 0
                    })
                    document.querySelector('.price-block_third').addEventListener('mouseenter', () => {
                        document.querySelector('.price-block_third-desc').style.opacity = 1
                    })
                    document.querySelector('.price-block_third').addEventListener('mouseleave', () => {
                        document.querySelector('.price-block_third-desc').style.opacity = 0
                    })
                    document.querySelector('.price-block_fourth').addEventListener('mouseenter', () => {
                        document.querySelector('.price-block_fourth-desc').style.opacity = 1
                    })
                    document.querySelector('.price-block_fourth').addEventListener('mouseleave', () => {
                        document.querySelector('.price-block_fourth-desc').style.opacity = 0
                    })    
                }           
            }   
            valueFormation()
           
            // Скролл к якорю(Портфолио)
            // const viewProject = document.querySelector('.header-buttons__black'),
            //       portfolioGrid = document.querySelector('.portfolio'),
            //       callbackTitle = document.querySelector('.callback'),
            //       sendBtn = document.querySelector('.send-btn');
            // viewProject.addEventListener('click', () => {
            //     portfolioGrid.scrollIntoView({behavior: "smooth", block: "start"});
            // });
            // sendBtn.addEventListener('click', () => {
            //     callbackTitle.scrollIntoView({behavior: "smooth", block: "start"});
            // });
            
            // $(document).ready(function(){
            //     $("#menu").on("click","a", function (event) {
            //         event.preventDefault(); //опустошим стандартную обработку
            //         var id  = $(this).attr('href'), //заберем айдишник блока с параметром URL
            //             top = $(id).offset().top; //определим высоту от начала страницы до якоря
            //     $('body,html').animate({scrollTop: top}, 1500); //сделаем прокрутку за 1.5 с
            //     });
            // });
    }, false);
});