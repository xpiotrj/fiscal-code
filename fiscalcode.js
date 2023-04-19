const consonants = [ 'B', 'C', 'D', 'F', 'G', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T', 'V', 'X', 'Z', 'H', 'R', 'W', 'Y']
const vowels = ['A', 'E', 'I', 'O', 'U']
const month_letters = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T']


function generateJSON(){
    const name = document.getElementById('name').value
    const surname = document.getElementById('surname').value
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dateofbirth = document.getElementById('dateofbirth').value;

    if(!validate(name, surname, dateofbirth)){
        return;
    }

    const JSON = {name: name, surname: surname, gender: gender, dateofbirth: dateofbirth};

    console.log(JSON);

    return JSON;

}

function generateFiscal(){
    const data = generateJSON()

    const fiscal = generateSurenameCode(data['surname']) + generateNameCode(data['name']) + generateDofAndGenderCode(data['dateofbirth'], data['gender'])

    document.getElementById('result').innerHTML = "Result: <b>" + fiscal + "</b>"
}


let validate = (name, surname, date) => {
    if(name.length < 2){
        alert('name')
        return false
    }
    if(surname.length < 3){
        alert('surname')
        return false
    }
    if(date.length < 2){
        alert('date')
        return false
    }
    return true;
}

function generateSurenameCode(surename){
    surename = surename.toUpperCase()
    consonants_data = getConsonants(surename)
    vowels_data = getVowels(surename)
    let code = '';

    //Less than three letters then "X" will take the third slot after the consonant and the vowel (Yu -> YUX).
    if(surename.length < 3){
        consonants_data['consonants'].forEach(element => {
            code += element;
        });
        vowels_data['vowels'].forEach(element => {
            code += element
        })
        code += "X"

        return code
    }

    //At least 3 consonants then the first three consonants are used. (Newman -> NWM).
    if(consonants_data['amount'] >= 3){
        code = consonants_data['consonants'][0] + consonants_data['consonants'][1] + consonants_data['consonants'][2];
        return code;
    }

    //Less than 3 consonants then vowels will replace missing characters in the same order they appear (Fox -> FXO | Hope -> HPO).
    if(consonants_data['amount'] < 3){
        let vowels_left = 3 - consonants_data['amount']
        consonants_data['consonants'].forEach(element => {
            code += element;
        });
        for(let i = 0; i < vowels_left; i++){
            code += vowels_data['vowels'][i];
        }
        return code;
    }
}


function generateNameCode(name){
    name = name.toUpperCase()
    consonants_data = getConsonants(name)
    vowels_data = getVowels(name)
    let code = '';

    //Less than three letters then "X" will take the the third slot after the consonant and the vowel (Al -> LAX).
    if(name.length < 3){
        consonants_data['consonants'].forEach(element => {
            code += element;
        });
        vowels_data['vowels'].forEach(element => {
            code += element
        })
        code += "X"

        return code
    }

    //Exactly 3 consonants then consonants are used in the order they appear (Matt -> MTT).
    if(consonants_data['amount'] == 3){
        consonants_data['consonants'].forEach(element => {
            code += element;
        });
        return code;
    }

    //More than 3 consonants then first, third and fourth consonant are used (Samantha -> SNT | Thomas -> TMS).
    if(consonants_data['amount'] > 3){
        code = consonants_data['consonants'][0] + consonants_data['consonants'][2] + consonants_data['consonants'][3];
        return code;
    }

    //Less than 3 consonants then vowels will replace missing characters in the same order they appear (Bob -> BBO | Paula -> PLA).
    if(consonants_data['amount'] < 3){
        let vowels_left = 3 - consonants_data['amount']
        consonants_data['consonants'].forEach(element => {
            code += element;
        });
        for(let i = 0; i < vowels_left; i++){
            code += vowels_data['vowels'][i];
        }
        return code;
    }
}

function generateDofAndGenderCode(dateofbirth, gender){
    const year = dateofbirth.split('-')[0]
    const day = parseInt(dateofbirth.split('-')[2])
    const month = parseInt(dateofbirth.split('-')[1])

    //last two digit of year
    const year_code = year.slice(-2)

    //corresponding letter
    const month_code = month_letters[month - 1]

    let day_code;
    if(gender == 'F'){
        //female
        day_code = day + 40; 
    }
    else{
        //male
        if(day < 10){
            day_code = '0' + day.toString()
        }
        else{
            day_code = code;
        }
    }

    return year_code + month_code + day_code;
}



let getConsonants = (data) => {
    data = data.toUpperCase()
    let consonants_in_string = []
    let indexes = []
    let amount = 0;
    for(let i = 0; i < data.length; i++){
        if(consonants.includes(data[i])){
            consonants_in_string.push(data[i]);
            indexes.push(i);   
            amount++;
        }
    }
    return {amount: amount, consonants: consonants_in_string, indexes: indexes};
}

let getVowels = (data) => {
    data = data.toUpperCase()
    let vowels_in_string = []
    let indexes = []
    let amount = 0;

    for(let i = 0; i < data.length; i++){
        if(vowels.includes(data[i])){
            vowels_in_string.push(data[i]);
            indexes.push(i);   
            amount++;
        }
    }
    return {amount: amount, vowels: vowels_in_string, indexes: indexes};
}

