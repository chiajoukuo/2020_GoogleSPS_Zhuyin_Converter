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

	return pinyin_text;
}


function callRequest(zhuyin){
	var pinyin_text = convert(zhuyin);
	$.ajax({
        url: 'https://www.google.com/inputtools/request?text=' + encodeURIComponent(pinyin_text) + '&ime=zh-hant-t-i0-pinyin&cb=?',
        dataType: 'json',
        success: function(data){
            if(data[0] == "SUCCESS"){
                var hant_text = data[1][0][1][0];     // translated text in traditional chinese
                var button = document.getElementById('zhuyin_button');
                button.innerHTML = hant_text;
            }    
        }
    });
}


function verify(text){
	/*
		TODO : Verify if the text are perhaps in wrong input.
	 */
  var has_at_least_one_tonal = false;
	var counter = 0;
    for (let each_char of text){
    	if(tonal_list.indexOf(each_char) == -1){
        if(counter > 4){
          return false
        }
    		counter ++;
    	}
    	else{
    		if(counter <= 4){
    			counter = 0;
          has_at_least_one_tonal = true;
    		}
    		else{
    			return false;
    		}
    	}
    }

	return has_at_least_one_tonal;
}


function translateText(input, zhuyin){
	callRequest(zhuyin);

	var button = document.getElementById('zhuyin_button');
	button.onclick = function(){
		var new_text = button.innerHTML;
		input.value = new_text;

		// Then the popup can disappear
		document.getElementById('zhuyin').style.display = 'none';
	}
}


function updateValue(e) {
	var rect = e.target.getBoundingClientRect();
	console.log(rect.top, rect.right, rect.bottom, rect.left);

	var text = e.target.value
  	console.log(text);

  	if(verify(text)){
  		e.target.style.cssText = "text-decoration-line: underline; text-decoration-color: red; text-underline-position : under";

  		console.log(e);

		var zh = document.getElementById('zhuyin');

		if(zh == null){
			// Create this popup only once, if it's null, then create it.
	        var divToCreate = document.createElement('div');
	        divToCreate.setAttribute('id', 'zhuyin');
	        divToCreate.style.cssText = "background-color: #fff ; border: 1px solid #000; position: absolute ; z-index:99999;";

	        // Set its position under target
	        divToCreate.style.left = rect.left + "px";
	        divToCreate.style.top = rect.top + 45 + "px";
	        divToCreate.style.display = 'none';


	        var button = document.createElement('button');
	        
	        button.setAttribute('id','zhuyin_button');
	        divToCreate.append(button);


	        divToCreate.onmouseover = function(e){
	          divToCreate.style.display = 'block';
        	}

	        var body = document.getElementsByTagName("BODY")[0];
	        body.append(divToCreate);
      	}


  		
  		e.target.onmouseover = function(e){
			// Wait for translation done
			document.createElement('button').innerHTML = "...";

  			// Get the translated text before showing the popup
  			translateText(e.target, text);

  			// Show the popup if mouse hovers the input
        	document.getElementById('zhuyin').style.display = 'block';
  		};

		e.target.onmouseout = function(e){
			// Hide it if mouse leaves the input
			document.getElementById('zhuyin').style.display = 'none';
		}
  	}
  	else{
  		e.target.style.cssText = "";
  	}
}


const input = document.querySelector('input');
const textarea = document.querySelector('textarea');


if(input){
	input.addEventListener('input', updateValue);
}
if(textarea){
	textarea.addEventListener('input', updateValue); 
}
