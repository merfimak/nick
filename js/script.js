window.onload = function() {






////////////////////////////////////////////////////////////////////accordion////////////////////////////////////////////////////////////////////


    let acc = document.getElementsByClassName("accordion");

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
       
        this.classList.toggle("active");//добовляем выбранной кнопке background-color: #ccc;

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;//nextElementSibling возвращает элемент следующий сразу за указанным в списке дочерних элементов родительского элемента
         if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";//Свойство scrollHeight содержит высоту элемента с учетом вертикальной прокрутки. Если у элемента нет вертикальной полосы прокрутки, то значение scrollHeight равно clientHeight. Свойство clientHeight содержит высоту элемента внутри границ вместе с padding
        }
      });
    }





 let swiper = new Swiper(".examples_wiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        keyboard: true,
      });




 let video = document.querySelectorAll(".video");
 let play = document.querySelectorAll(".play");


 for(let i = 0; i < video.length; i++){
    video[i].addEventListener('click', (event) => {
        if (video[i].paused) {
                video[i].play();
                video[i].previousElementSibling.style.display = 'none';
            } 
            else {
                video[i].pause();
                  video[i].previousElementSibling.style.display = 'block';
            }
 })
}

 for(let i = 0; i < play.length; i++){
    play[i].addEventListener('click', (event) => {
        if (play[i].nextElementSibling.paused) {
                play[i].nextElementSibling.play();
                play[i].style.display = 'none';
            } 
            else {
                play[i].nextElementSibling.pause();
                play[i].style.display = 'block';
            }
 })
}


////////////////////////////////////////////////////////////////////форма////////////////////////////////////////////////////////////////////
    const form = document.getElementById('form');
    const message = document.getElementById('message');
    let formReq = document.querySelectorAll('._req');
    form.addEventListener('submit', formSend); 



    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);// проверяем своим валидатором
        if(error === 0){
        message.className = 'message';//оставляем только класс message(на случай если посетитель уже совершал ошибку то там будет еще и _error, нам такое не недо)
        message.classList.add('_success');
        message.innerHTML = 'Сообщение отправленно';
        for(let index = 0; index < formReq.length; index++){//удоляем все плейсхолдеры если в них были сообщения об ошибках
            const input = formReq[index];
            input.placeholder = '';
        }
        }else{
            message.classList.add('_false');
            message.innerHTML = 'Заполните все поля';
        }
    }



    function formValidate(form){
    let error = 0;// обнуляем все ошибки

    for(let index = 0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('_email')){

        if(input.value === ''){
          input.placeholder = 'This field is required';
           formAddError(input);
           error++;
        }
        if(input.value != '' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)){
          input.value = '';
           input.placeholder = 'enter correct e-mail';
          formAddError(input);
          error++;
        }
      } else if(input.classList.contains('_text')){
          if(input.value === ''){
            input.placeholder = 'это поле обязательно для заполнения';
             formAddError(input);
             error++;
          }
          if(input.value != '' && input.value.length < 2){
            input.value = '';
            input.placeholder = 'минимальное количество знаков больше 2';
             formAddError(input);
             error++;
          }
          if(input.value != '' && input.value.length > 500){
            input.value = '';
            input.placeholder = 'максимально количество знаков не больше 500';
             formAddError(input);
             error++;
          }
        }else if(input.getAttribute("type") ==="checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }
    }
    return error;
    }

          function formAddError(input){
            
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
          }

          function formRemoveError(input){
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
          }




}