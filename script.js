$(document).ready(function() {
    
    // game init

    var secretWord = 'dick'

    var inputContent
    const N = 5
    var inputError = false
    var inputErrorMsg = 'cockass'
    var regex = /[^а-яА-ЯёЁ]/
    var currentRow = 0
    let inputContentUpdate = "     "
    var guessedWords = []
    var bannedChars = []
    var correctChars = []
    var isGameOver = false

    function startNewGame() {
        secretWord = wordArrayEasy[Math.floor(Math.random() * wordArray.length)]
    }


    // update current row with input

    $('.input-holder').on('input', function(){
        if(isGameOver) {} 
        else {
            inputContent = $('.input-holder').val()
            inputContentUpdate = inputContent.toUpperCase()

            if (inputContent.length < 6) {
                for (let i = 0; i < (5 - inputContent.length); i++) {
                    inputContentUpdate = inputContentUpdate + ' '
                    
                }
                
            } else {
                inputContent = inputContent.substring(0,5)
                $('.input-holder').val(inputContent)
            }
            
            for (let i = 0; i < 5; i++) {
                $("#" + currentRow + " div:nth-child(" + ( i + 1 ) + ")").html(inputContentUpdate[i])  
                
            }
            $("#" + currentRow + " div:nth-child(" + (inputContent.length) + ")").addClass('pop-up')
    
            $("#" + currentRow + " div:nth-child(" + (inputContent.length + 1) + ")").removeClass('pop-up')
        }

            
        

    })




    // trigger a check
    
    $('.check-btn').click(function(){
        checkWord()
        if (inputError) {
            showError(inputErrorMsg)
        }
    })

    $(document).keypress(function(event){

        if (event.which === 13) {
            checkWord()
            if (inputError) {
                showError(inputErrorMsg)
            }  
        }
    })

    // error handler 

    function showError() {
        inputError = false 
        $('.error-container').html('Error: ' + inputErrorMsg)
        inputErrorMsg = ''

        $('.error-container').animate({
            opacity: 1
        }, 1000, function(){
            $('.error-container').animate({
                opacity: 0
            }, 3000)
        })

        
    }

    // sobstvenno check

    function checkWord() {

        if(isGameOver) {} 
        else {
            inputContent = $('.input-holder').val()
    
            // input is empty 
    
            if (inputContent.length == "") {
                inputError = true
                inputErrorMsg = 'Напиши что-нибудь, конченый долбоеб'
                return(inputErrorMsg)
            } 
    
            // only cyrillic letters 
    
            if (regex.test(inputContent)) {
                inputError = true
                inputErrorMsg = 'Только кириллица, конченый долбоеб'
                return(inputErrorMsg)
            }         
    
            // word is correct lenght
    
            if (inputContent.length === N) {} 
            else {
                inputError = true
                inputErrorMsg = 'В слове должно быть 5 букв, конченый долбоеб'
                return(inputErrorMsg)
            }
    
            // word is even exist
    
            if ($.inArray(inputContent.toLowerCase(), wordArray) ==-1) {
                inputError = true
                inputErrorMsg = 'Слово выдумано, а ты - конченый долбоеб'
                return(inputErrorMsg)
            } 
    
            // check if word is already guessed
    
            if ($.inArray(inputContent, guessedWords) == false ) {
                inputError = true
                inputErrorMsg = 'уже пробовал это слово, конченый долбоеб'
                return(inputErrorMsg) 
            }
    
            // check if contains banned chars 

            // OFF = EASYMODE
    
            // for (let i = 0; i < N; i++) {
            //     if (bannedChars.indexOf(inputContent[i].toLowerCase()) > -1) {
            //         inputError = true
            //         inputErrorMsg = 'пробуй другие буквы, конченый долбоеб'
            //         return(inputErrorMsg) 
            //     }
                
            // }

            // input is correct, next row, check if gg
    
            currentRow++
            guessedWords.push(inputContent)
            $(".input-holder").val('')
            
            // check for CORRECT CHARS + POS
    
            for (let i = 0; i < N; i++) {
    
                if (secretWord.indexOf(inputContent[i])> -1) {
    
                    if (correctChars.indexOf(inputContent[i])> -1) {} else {
                        correctChars.push(inputContent[i])
                        console.log(correctChars)
                    } 
                    
                    $("#" + (currentRow - 1) + " div:nth-child(" + ( i + 1 ) + ")").addClass('correct-char') 
                    if (secretWord[i] === inputContent[i]) {
                        $("#" + (currentRow - 1) + " div:nth-child(" + ( i + 1 ) + ")").addClass('correct-char-and-pos')
                    }
                } else {
                    $("#" + (currentRow - 1) + " div:nth-child(" + ( i + 1 ) + ")").addClass('wrong-char')
    
                    if (bannedChars.indexOf(inputContent[i])> -1) {} else {
                        bannedChars.push(inputContent[i])
                        console.log(bannedChars)
                    } 
                } 
    
            }
    
            if (secretWord == inputContent.toLowerCase()) {
                isGameOver = true
               $('.inputs-container').fadeOut();
               $('.restart-btn').toggle();
            } if (currentRow === 5) {
                console.log('лох')
                console.log(secretWord)
            }
    
        }   
    }


    $('.restart-btn').click(function (e) { 
        location.reload();
    });










    startNewGame()

  });
  