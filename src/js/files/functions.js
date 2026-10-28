//!? ========================================================================================================================================================================================================================================================
//!? Проверка поддержки webp, добавление класса webp или no-webp для HTML 
//!? ========================================================================================================================================================================================================================================================

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}





//!? ========================================================================================================================================================================================================================================================
//!? Проверка мобильного браузера
//!? ========================================================================================================================================================================================================================================================

export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}





//!? ========================================================================================================================================================================================================================================================
//!? Добавление loaded для HTML после полной загрузки страницы
//!? ========================================================================================================================================================================================================================================================

export function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}





//!? ========================================================================================================================================================================================================================================================
//!? Получение хеша в адресе сайта
//!? ========================================================================================================================================================================================================================================================

export function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}





//!? ========================================================================================================================================================================================================================================================
//!? Указание хеша в адресе сайта
//!? ========================================================================================================================================================================================================================================================

export function setHash(hash) {
	history.pushState('', '', hash);
}





//!? ========================================================================================================================================================================================================================================================
//!? Учет плавающей панели на мобильных устройствах при 100vh
//!? ========================================================================================================================================================================================================================================================

export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}





//!? ========================================================================================================================================================================================================================================================
//!? Вспомогательные модули плавного расскрытия и закрытия объекта
//!? ========================================================================================================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
export let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}





//!? ========================================================================================================================================================================================================================================================
//!? Вспомогательные модули блокировки прокрутки и скочка
//!? ========================================================================================================================================================================================================================================================

export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}





//!? ========================================================================================================================================================================================================================================================
//!? Модуь работы со спойлерами
//!? ========================================================================================================================================================================================================================================================

/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
export function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});
		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});
			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addEventListener("change", function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
	}
}





//!? ========================================================================================================================================================================================================================================================
//!?  Модуль работы с табами
//!? ========================================================================================================================================================================================================================================================

/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
export function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	if (tabs.length > 0) {
		const hash = location.hash.replace('#', '');
		if (hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-');
		}
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});

		// Получение табов с медиа запросами
		const tabsMedia = Array.from(tabs).filter(function (item, index, self) {
			return item.dataset.tabs;
		});
		// Инициализация табов с медиа запросами
		if (tabsMedia.length > 0) {
			initMediaTabs(tabsMedia);
		}
	}
	// Инициализация табов с медиа запросами
	function initMediaTabs(tabsMedia) {
		const breakpointsArray = [];
		tabsMedia.forEach(item => {
			const breakpointValue = item.dataset.tabs;

			const tabsBreakpointsObject = {};
			tabsBreakpointsObject.value = breakpointValue;
			tabsBreakpointsObject.item = item;

			breakpointsArray.push(tabsBreakpointsObject);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return `(max-width:${item.value}px),${item.value}`;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const matchMedia = window.matchMedia(paramsArray[0]);
			const mediaBreakpoint = paramsArray[1];

			// Объекты с нужными условиями
			const tabsMediaArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint) {
					return true;
				}
			});

			// Событие
			matchMedia.addEventListener("change", function () {
				setTitlePosition(tabsMediaArray, matchMedia);
			});
			setTitlePosition(tabsMediaArray, matchMedia);
		});
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item;
			const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
			const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
			tabsActiveTitle.classList.remove('_tab-active');
		}
		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.add('_tab-active');
				}
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);

		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = false;
					}
					location.hash = `tab-${tabsBlockIndex}-${index}`;
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = true;
					}
				}
			});
		}
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]');
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelectorAll('._slide').length) {

				const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
				if (tabActiveTitle) {
					tabActiveTitle.classList.remove('_tab-active');
				}

				tabTitle.classList.add('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}
	}
}






//!? ========================================================================================================================================================================================================================================================
//!? Модуль работы с меню (бургер)
//!? ========================================================================================================================================================================================================================================================

export function menuInit() {
	let iconMenu = document.querySelector(".icon-menu");
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			if (bodyLockStatus) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}

export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}






//!? ========================================================================================================================================================================================================================================================
//!?  Модуль "показать еще"
//!? ========================================================================================================================================================================================================================================================

/*
Документация по работе в шаблоне:
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/

// showMore() — запускает систему.
// data-showmore — обозначает блок, в котором работает кнопка.
// data-showmore-content — обозначает контейнер с карточками.
// data-showmore-button — обозначает саму кнопку.
// _slideUp() и _slideDown() — отвечают за анимацию сворачивания и раскрытия.

export function showMore() { // Объявляется функция, которую можно импортировать в другом файле
	const showMoreBlocks = document.querySelectorAll('[data-showmore]'); // Браузер ищет все элементы с атрибутом data-showmore
	if (showMoreBlocks.length) { // Проверяет, найден ли хотя бы один такой блок (Ноль считается ложным значением, а ненулевое число - истинным)
		initItems(showMoreBlocks); // Здесь вызывается другая функция - initItems()
		document.addEventListener("click", showMoreActions); // Подключает обработчик нажатий («Следи за кликами по документу. Когда кто-нибудь нажмёт, запускай функцию showMoreActions»)
		window.addEventListener("resize", showMoreActions); // Реагирует на изменение размера окна, например при повороте телефона
	}

	function initItems(showMoreBlocks) {
		showMoreBlocks.forEach(showMoreBlock => { // Здесь используется метод forEach(). Он проходит по каждому элементу коллекции и выполняет для него определённый код
			initItem(showMoreBlock); // Для каждого блока вызывается функция initItem()
		});
	}

	function initItem(showMoreBlock) { // Объявляем функцию первоначальной настройки одного блока «Показать ещё».
		const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]'); // Находим внутри текущего блока элемент с атрибутом data-showmore-content — контейнер с карточками 
		const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]'); // Находим внутри текущего блока кнопку с атрибутом data-showmore-button 

		if (!showMoreContent || !showMoreButton) return; // Если контейнер с карточками или кнопка не найдены, прекращаем выполнение этой функции, чтобы избежать ошибки 

		// Если контейнер уже раскрыт, не сворачиваем его повторно.
		if (showMoreBlock.classList.contains('_showmore-active')) return; // Проверяем наличие класса _showmore-active; если он есть, блок уже раскрыт, поэтому повторная настройка не нужна 
		const hiddenHeight = getHeight(showMoreBlock, showMoreContent); // Вычисляем высоту контента, который должен оставаться видимым в свёрнутом состоянии 
		const originalHeight = getOriginalHeight(showMoreContent); // Получаем полную высоту содержимого, чтобы сравнить её с высотой свёрнутого блока 

		if (hiddenHeight < originalHeight) { // Если высота свёрнутого содержимого меньше полной высоты, значит, часть карточек можно скрыть 
			_slideUp(showMoreContent, 0, hiddenHeight); // Устанавливаем ограниченную высоту контейнера без анимации, чтобы скрыть лишнее содержимое 
			showMoreButton.hidden = false; // Показываем кнопку, поскольку содержимое действительно можно раскрыть 
		} else { // Если высота свёрнутого содержимого не меньше полной высоты, скрывать нечего 
			showMoreContent.style.removeProperty('height'); // Удаляем заданную через JavaScript высоту, чтобы контейнер отображался по своей естественной высоте 
			showMoreButton.hidden = true; // Скрываем кнопку, поскольку весь контент уже помещается на экране
		}
	}

	function getHeight(showMoreBlock, showMoreContent) { // Объявляем функцию расчёта высоты содержимого в свёрнутом состоянии 
		const showMoreType = showMoreBlock.dataset.showmore || 'size'; // Читаем значение атрибута data-showmore; если оно пустое или отсутствует, используем тип size 

		if (showMoreType === 'items') { // Если тип равен items, ограничиваем содержимое по количеству карточек, а не по фиксированной высоте в пикселях 
			const showMoreTypeValue = Number( // Преобразуем значение атрибута data-showmore-content в число 
				showMoreContent.dataset.showmoreContent || 3 // Берём число из data-showmore-content; если оно не задано, используем значение 3 
			); // Завершаем преобразование значения в число 

			const items = [...showMoreContent.children]; // Получаем непосредственных дочерних элементов контейнера и превращаем коллекцию в обычный массив 

			if (!items.length) return 0; // Если внутри контейнера нет карточек, возвращаем высоту 0 

			// Определяем фактическое количество колонок по позициям карточек 
			const firstTop = items[0].getBoundingClientRect().top; // Получаем координату верхнего края первой карточки относительно окна браузера 
			let columns = 0; // Создаём переменную для подсчёта карточек в первом ряду и первоначально устанавливаем её в 0 

			for (const item of items) { // Перебираем все карточки массива по очереди 
				if (Math.abs(item.getBoundingClientRect().top - firstTop) < 1) { // Проверяем, находится ли верхний край карточки примерно на той же высоте, что и первая карточка 
					columns++; // Если карточка находится в первом ряду, увеличиваем количество колонок на единицу 
				} else { // Если верхний край карточки отличается, значит, начался следующий ряд 
					break; // Прекращаем цикл, поскольку карточки первого ряда уже подсчитаны 
				} // Завершаем проверку положения текущей карточки 
			} // Завершаем цикл подсчёта колонок 

			// Сколько рядов нужно показать 
			const rows = Math.ceil(showMoreTypeValue / columns); // Вычисляем количество рядов: делим нужное количество карточек на число колонок и округляем вверх 

			// Находим карточку в последнем видимом ряду 
			const lastVisibleItem = items[Math.min( // Определяем индекс последней карточки, которая должна остаться видимой 
				rows * columns, // Вычисляем общее количество мест в нужных рядах 
				items.length // Получаем общее количество карточек, чтобы не выйти за пределы массива 
			) - 1]; // Вычитаем 1, поскольку индексы массива начинаются с нуля, и получаем последнюю карточку видимой области 

			const contentTop = showMoreContent.getBoundingClientRect().top; // Получаем координату верхнего края всего контейнера с карточками 
			const itemBottom = lastVisibleItem.getBoundingClientRect().bottom; // Получаем координату нижнего края последней карточки видимого ряда 

			return itemBottom - contentTop; // Возвращаем расстояние от верха контейнера до низа последней видимой карточки — это высота свёрнутой области 
		} // Завершаем обработку типа items 

		return Number(showMoreContent.dataset.showmoreContent || 150); // Для других типов возвращаем высоту из data-showmore-content; если значение отсутствует, используем 150 пикселей 
	} // Завершаем функцию getHeight() 


	function getOriginalHeight(showMoreContent) {
		const height = showMoreContent.offsetHeight;
		showMoreContent.style.removeProperty('height');
		const originalHeight = showMoreContent.offsetHeight;
		showMoreContent.style.height = `${height}px`;
		return originalHeight;
	}


	function showMoreActions(e) { // Обработка клика и изменения окна
		// e — объект события, который браузер передаёт обработчику
		const targetEvent = e.target; // элемент, на котором произошло событие
		const targetType = e.type; // тип события, например "click" или "resize"
		if (targetType === 'click') { // Если событие является кликом, выполняется блок обработки кнопки
			if (targetEvent.closest('[data-showmore-button]')) { // closest() ищет ближайший элемент, который соответствует указанному CSS-селектору, начиная с самого элемента и двигаясь вверх по родителям
				const showMoreButton = targetEvent.closest('[data-showmore-button]'); // Повторное получение кнопки (кнопка)
				const showMoreBlock = showMoreButton.closest('[data-showmore]'); // Поиск родительского блока (внешний блок)
				const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]'); // Поиск содержимого (содержимое, которое нужно раскрывать)
				// условие ? значениеЕслиИстина : значениеЕслиЛожь;
				const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500'; // Здесь код пытается прочитать скорость анимации из атрибута data-showmore-button на внешнем блоке
				const hiddenHeight = getHeight(showMoreBlock, showMoreContent); // Расчёт высоты свёрнутого блока
				if (!showMoreContent.classList.contains('_slide')) { // Проверка: не выполняется ли уже анимация? Это условие защищает контейнер от повторного запуска анимации, пока предыдущая ещё выполняется. Если у контейнера нет класса _slide, разрешить выполнение дальнейшего кода
					showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight); // Метод contains() проверяет, есть ли у внешнего блока класс _showmore-active. Этот класс используется как индикатор состояния: класса нет — блок считается свёрнутым; класс есть — блок считается раскрытым
					showMoreBlock.classList.toggle('_showmore-active'); // Метод toggle() переключает CSS-класс. Если класса нет, он добавляется. Если класс есть, он удаляется
				}
			}
		} else if (targetType === 'resize') { // Например, пользователь открывает каталог на компьютере, где в строке четыре карточки, а затем сужает окно браузера до мобильного размера, где в строке остаются две карточки
			initItems(showMoreBlocks);
		}
	}
}




//!? ========================================================================================================================================================================================================================================================
//!?  Получить цифры из строки
//!? ========================================================================================================================================================================================================================================================

export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}






//!? ========================================================================================================================================================================================================================================================
//!?  Форматирование цифр типа 100 000 000
//!? ========================================================================================================================================================================================================================================================

export function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}






//!? ========================================================================================================================================================================================================================================================
//!?  Убрать класс из всех элементов массива
//!? ========================================================================================================================================================================================================================================================

export function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}






//!? ========================================================================================================================================================================================================================================================
//!?  Уникализация массива
//!? ========================================================================================================================================================================================================================================================

export function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}






//!? ========================================================================================================================================================================================================================================================
//!?  Функция получения индекса внутри родителя
//!? ========================================================================================================================================================================================================================================================

export function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

//================================================================================================================================================================================================================================================================================================================