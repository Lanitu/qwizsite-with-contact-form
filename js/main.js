const questions = [
	{
		question: "Давайте начнём с того, какая у Вас цель?",
		answers: [
			"Нужен чисто сайт или Лендинг",
			"Неважно что, нужны заявки и увеличение продаж",
		    "Хотите маркетинговую упаковку",
		    "Интересует таргет и продвижение",
		],
	},
	{
		question: "Какого рода у Вас бизнес, чтобы понимать какое решение вам нужно?",
		answers: [
			"Услуги ",
			"Продажа товаров",
			"Оба варианта ",
		],
	},
];

// Получаемэлементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные опросник
let score = 0;
let questionIndex = 0;

// Вызов функции для очистки страницы и генерации вопроса
clearPage();
showQuestions();
submitBtn.onclick = checkAnswer;

// Очистка HTML
function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// Рендер вопроса 
function showQuestions() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	headerContainer.innerHTML = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']){
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;		
	
		const answerHTML = questionTemplate
				.replace('%answer%',answerText)
				.replace('%number%', answerNumber)

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

// Проверка вопроса
function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	const userAnswer = parseInt(checkedRadio.value);

	// Последний ли вопрос в квизе
	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestions();
		return;
	} else {
		clearPage();
		showResults();
	}

	// Если не выбран
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	};
}

// Показать результат
function showResults(){
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<form action="" method="post" class="form" id="form">
			<input type="text" class="tel" placeholder="%input%" name="tel" id="tel">
		</form>
	`;

	let title, message;

	// Ответы в конце
	title = 'Будем честными с Вами: после заполнения формы я получу вашу заявку и приступлю к расчету стоимости и подготовке КП для вас!';
	message = 'Чтобы все это получить КП + Бонус - введите Ваши данные чтобы я смог с Вами связаться и все выслать!';
	
	// Результаты
	let input = `Ваш телефон в Telegram или WhatsApp`;

	// Последняя страница
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%input%', input);

	headerContainer.innerHTML = finalMessage;
	
	


	// Замена кнопки	
	
	submitBtn.blur();
	submitBtn.innerHTML = 'Отправить';
	submitBtn.onclick = () =>{history.go()};
}

