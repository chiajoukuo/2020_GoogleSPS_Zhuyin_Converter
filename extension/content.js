/*
    " "    // Tone 1 _
    "6"    // Tone 2 ˊ
    "3"    // Tone 3 ˇ
    "4"    // Tone 4 ˋ
    "7"    // Tone 5 ˙
*/
const tonal_list = [' ', '6', '3', '4', '7'];

/* If one's vecotr has size of two:
    first one is when there's a rhymes or medial after it
    second one is when it appears solely
*/
let consonantsMap = new Map();

/* If one's vecotr has size of two:
    first one is when there's a consonant before it
    second one is when it appears solely
*/
let rhymes_medials_map = new Map(); 

function init_global_var(){
    consonantsMap.set("1", ["b"]);   // ㄅ
    consonantsMap.set("q", ["p"]);   // ㄆ
    consonantsMap.set("a", ["m"]);   // ㄇ
    consonantsMap.set("z", ["f"]);   // ㄈ
    consonantsMap.set("2", ["d"]);   // ㄉ
    consonantsMap.set("w", ["t"]);   // ㄊ
    consonantsMap.set("s", ["n"]);   // ㄋ
    consonantsMap.set("x", ["l"]);   // ㄌ
    consonantsMap.set("e", ["g"]);   // ㄍ
    consonantsMap.set("d", ["k"]);   // ㄎ
    consonantsMap.set("c", ["h"]);   // ㄏ
    consonantsMap.set("r", ["j"]);   // ㄐ
    consonantsMap.set("f", ["q"]);   // ㄑ
    consonantsMap.set("v", ["x"]);   // ㄒ
    
    consonantsMap.set("5", ["zh", "zhi"]);  // ㄓ
    consonantsMap.set("t", ["ch", "chi"]);  // ㄔ
    consonantsMap.set("g", ["sh", "shi"]);  // ㄕ
    consonantsMap.set("b", ["r", "ri"]);    // ㄖ
    consonantsMap.set("y", ["z", "zi"]);    // ㄗ
    consonantsMap.set("h", ["c", "ci"]);    // ㄘ
    consonantsMap.set("n", ["s", "si"]);    // ㄙ
    
    
    rhymes_medials_map.set("8", ["a"]);     // ㄚ
    rhymes_medials_map.set("i", ["o"]);     // ㄛ
    rhymes_medials_map.set("k", ["e"]);     // ㄜ
    rhymes_medials_map.set(",", ["ei"]);    // ㄝ
    rhymes_medials_map.set("9", ["ai"]);    // ㄞ
    rhymes_medials_map.set("o", ["ei"]);    // ㄟ
    rhymes_medials_map.set("l", ["ao"]);    // ㄠ
    rhymes_medials_map.set(".", ["ou"]);    // ㄡ
    rhymes_medials_map.set("0", ["an"]);    // ㄢ
    rhymes_medials_map.set("p", ["en"]);    // ㄣ
    rhymes_medials_map.set(";", ["ang"]);   // ㄤ
    rhymes_medials_map.set("/", ["eng"]);   // ㄥ
    rhymes_medials_map.set("-", ["er"]);    // ㄦ
    
    rhymes_medials_map.set("u",  ["i", "yi"]);      // ㄧ
    rhymes_medials_map.set("u8", ["ia", "ya"]);     // ㄧㄚ
    rhymes_medials_map.set("ui", ["iu", "yo"]);     // ㄧㄛ
                                                    // ㄧㄜ not exists
    rhymes_medials_map.set("u,", ["ie", "ye"]);     // ㄧㄝ
    rhymes_medials_map.set("u9", ["ya"]);           // ㄧㄞ
                                                    // ㄧㄟ not exists
    rhymes_medials_map.set("ul", ["iao", "yao"]);   // ㄧㄠ
    rhymes_medials_map.set("u.", ["iu", "you"]);    // ㄧㄡ
    rhymes_medials_map.set("u0", ["ian", "yan"]);   // ㄧㄢ
    rhymes_medials_map.set("up", ["in", "yin"]);    // ㄧㄣ
    rhymes_medials_map.set("u;", ["iang", "yang"]); // ㄧㄤ
    rhymes_medials_map.set("u/", ["ing", "ying"]);  // ㄧㄥ
                                                    // ㄧㄦ not exists
    
    
    rhymes_medials_map.set("j",  ["u", "wu"]);      // ㄨ
    rhymes_medials_map.set("j8", ["ua", "wa"]);     // ㄨㄚ
    rhymes_medials_map.set("ji", ["uo", "wo"]);     // ㄨㄛ
                                                    // ㄨㄜ not exists
                                                    // ㄨㄝ not exists
    rhymes_medials_map.set("j9", ["uai", "wai"]);   // ㄨㄞ
    rhymes_medials_map.set("jo", ["ui", "wei"]);    // ㄨㄟ
                                                    // ㄨㄠ not exists
                                                    // ㄨㄡ not exists
    rhymes_medials_map.set("j0", ["uan", "wan"]);   // ㄨㄢ
    rhymes_medials_map.set("jp", ["un", "wen"]);    // ㄨㄣ
    rhymes_medials_map.set("j;", ["uang", "wang"]); // ㄨㄤ
    rhymes_medials_map.set("j/", ["ong", "weng"]);   // ㄨㄥ
                                                    // ㄨㄦ not exists
    
    
    rhymes_medials_map.set("m",  ["v", "yu"]);      // ㄩ
                                                    // ㄩㄚ not exists
                                                    // ㄩㄛ not exists
                                                    // ㄩㄜ not exists
    rhymes_medials_map.set("m,", ["ue", "yue"]);    // ㄩㄝ
                                                    // ㄩㄞ not exists
                                                    // ㄩㄟ not exists
                                                    // ㄩㄠ not exists
                                                    // ㄩㄡ not exists
    rhymes_medials_map.set("m0", ["uan", "yuan"]);  // ㄩㄢ
    rhymes_medials_map.set("mp", ["un", "yun"]);    // ㄩㄣ
                                                    // ㄩㄤ not exists
    rhymes_medials_map.set("m/", ["iong", "yon"]);  // ㄩㄥ
                                                    // ㄩㄦ not exists
}

function rearrange(zhuyin){
    var ret = "";
    // find last consonant
    for(var index = zhuyin.length - 1; index >= 0; index --){
        if(consonantsMap.get(zhuyin[index])){
            ret += zhuyin[index];
            break;
        }
    }
    // find last medial
    for(var index = zhuyin.length - 1; index >= 0; index --){
        if(zhuyin[index] === 'u' || zhuyin[index] === 'j' || zhuyin[index] === 'm' ){
            ret += zhuyin[index];
            break;
        }
    }
    // find last rhyme
    for(var index = zhuyin.length - 1; index >= 0; index --){
        if(rhymes_medials_map.get(zhuyin[index]) && zhuyin[index] !== 'u' && zhuyin[index] !== 'j' && zhuyin[index] != 'm'){
            ret += zhuyin[index];
            break;
        }
    }
    return ret;
}

function convertAWordFromZhuyinToPingyin(zhuyin){
    zhuyin = rearrange(zhuyin);
    var retval = "";
    
    if(zhuyin == "") return "";
    
    // First find if it has a consonant
    if(consonantsMap.has(zhuyin.substr(0,1))){
        // It does have
        var result = consonantsMap.get(zhuyin.substr(0,1));
        
        // Check if this is the only symbol
        if(Object.keys(result).length == 2 && zhuyin.length == 1){
            return result[1];
        }
        else{
            retval += result[0];
        }
        
        // Find the rest rhymes_medials parts
        result = rhymes_medials_map.get(zhuyin.substr(1));
        
        // Whether result has size of 2 or 1, because it has a consonant, always use first result
        retval += result[0];
    }
    
    else{
        // It doesn't have a consonant, all of them are rhymes and medials
        var result = rhymes_medials_map.get(zhuyin);
        
        // Check if this is the only component
        if(Object.keys(result).length  == 2){
            return result[1];
        }
        else{
            retval += result[0];
        }
    }
    
    return retval;
}

function convertFromZhuyinToPinyin(zhuyin_text){
    var ret_val = "";
    var undecoded_word = "";
    
    for (let each_char of zhuyin_text) {
        if(tonal_list.indexOf(each_char) == -1 ) {
            undecoded_word += each_char;
        }
        else{
            // Meet the tonal marks, one word finished, decode it and append to return value
            ret_val += convertAWordFromZhuyinToPingyin(undecoded_word);
            undecoded_word = "";
        }
    }   
    
    return ret_val;
}


function convert(zhuyin){
    const pinyin_text = convertFromZhuyinToPinyin(zhuyin);
    console.log(pinyin_text);

    var url = "https://www.google.com/inputtools/request?text=" + pinyin_text + "&ime=zh-hant-t-i0-pinyin&";

    return fetch(url);
}

chrome.runtime.onMessage.addListener(function (request) {
    replaceSelectedText(document.activeElement);
});

function replaceSelectedText(elem) {
    var start = elem.selectionStart;
    var end = elem.selectionEnd;

    if(typeof elem.value === 'string'){
		var select_text = elem.value.substr(start, end - start);

        // Wait for promise's result here instead of in the function
		var promise = convert(select_text);
		console.log(promise);

        promise.then(response => response.json()).then((result) => {
	        console.log(result);
	        if(result[0] == "SUCCESS"){
	            var hant_text = result[1][0][1][0];     // translated text in traditional chinese
	            console.log(hant_text);
	            elem.value = elem.value.slice(0, start) + hant_text + elem.value.substr(end);   // replace the text
	        }	
		
    	})
    }
}

init_global_var();