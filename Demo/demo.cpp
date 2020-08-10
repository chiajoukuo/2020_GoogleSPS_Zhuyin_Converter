#include <string>
using std::string;
#include <set>
using std::set;
#include <map>
using std::map;
#include <vector>
using std::vector;
#include <iostream>
using std::cout; using std::endl; using std::cin;

/*
    " "    // Tone 1 _
    "6"    // Tone 2 ˊ
    "3"    // Tone 3 ˇ
    "4"    // Tone 4 ˋ
    "7"    // Tone 5 ˙
*/
const set<char> tonalSet{' ', '6', '3', '4', '7'};


/* If one's vecotr has size of two:
    first one is when there's a rhymes or medial after it
    second one is when it appears solely
*/
const map<string, vector<string>> consonantsMap = {
    {"1", {"b"}},     // ㄅ
    {"q", {"p"}},     // ㄆ
    {"a", {"m"}},     // ㄇ
    {"z", {"f"}},     // ㄈ
    {"2", {"d"}},     // ㄉ
    {"w", {"t"}},     // ㄊ
    {"s", {"n"}},     // ㄋ
    {"x", {"l"}},     // ㄌ
    {"e", {"g"}},     // ㄍ
    {"d", {"k"}},     // ㄎ
    {"c", {"h"}},     // ㄏ
    {"r", {"j"}},     // ㄐ 
    {"f", {"q"}},     // ㄑ
    {"v", {"x"}},     // ㄒ


    {"5", {"zh", "zhi"}},   // ㄓ
    {"t", {"ch", "chi"}},   // ㄔ
    {"g", {"sh", "shi"}},   // ㄕ
    {"b", {"r", "ri"}},     // ㄖ
    {"y", {"z", "zi"}},     // ㄗ
    {"h", {"c", "ci"}},     // ㄘ
    {"n", {"s", "si"}},     // ㄙ
};

/* If one's vecotr has size of two:
    first one is when there's a consonant before it
    second one is when it appears solely
*/
const map<string, vector<string>> rhymes_medials_map = {
    {"8", {"a"}},     // ㄚ
    {"i", {"o"}},     // ㄛ
    {"k", {"e"}},     // ㄜ
    {",", {"ei"}},    // ㄝ
    {"9", {"ai"}},    // ㄞ
    {"o", {"ei"}},    // ㄟ
    {"l", {"ao"}},    // ㄠ
    {".", {"ou"}},    // ㄡ
    {"0", {"an"}},    // ㄢ
    {"p", {"en"}},    // ㄣ
    {";", {"ang"}},   // ㄤ
    {"/", {"eng"}},   // ㄥ
    {"=", {"er"}},    // ㄦ


    {"u", {"i", "yi"}},         // ㄧ
    {"u8", {"ia", "ya"}},       // ㄧㄚ
    {"ui", {"iu", "yo"}},       // ㄧㄛ
                                // ㄧㄜ not exists
    {"u,", {"ie", "ye"}},       // ㄧㄝ
    {"u9", {"ya"}},             // ㄧㄞ
                                // ㄧㄟ not exists
    {"ul", {"iao", "yao"}},     // ㄧㄠ
    {"u.", {"iu", "you"}},      // ㄧㄡ
    {"u0", {"ian", "yan"}},     // ㄧㄢ
    {"up", {"in", "yin"}},      // ㄧㄣ
    {"u;", {"iang", "yang"}},   // ㄧㄤ
    {"u/", {"ing" "ying"}},     // ㄧㄥ
                                // ㄧㄦ not exists


    {"j", {"u", "wu"}},         // ㄨ
    {"j8", {"ua", "wa"}},       // ㄨㄚ
    {"ji", {"uo", "wo"}},       // ㄨㄛ
                                // ㄨㄜ not exists
                                // ㄨㄝ not exists
    {"j9", {"uai", "wai"}},     // ㄨㄞ
    {"jo", {"ui", "wei"}},      // ㄨㄟ
                                // ㄨㄠ not exists
                                // ㄨㄡ not exists
    {"j0", {"uan", "wan"}},     // ㄨㄢ
    {"jp", {"un", "wen"}},      // ㄨㄣ
    {"j;", {"uang", "wang"}},   // ㄨㄤ
    {"j/", {"on", "weng"}},     // ㄨㄥ
                                // ㄨㄦ not exists
    
    {"m", {"v", "yu"}},         // ㄩ
                                // ㄩㄚ not exists
                                // ㄩㄛ not exists
                                // ㄩㄜ not exists
    {"m,", {"ue", "yue"}},      // ㄩㄝ
                                // ㄩㄞ not exists
                                // ㄩㄟ not exists
                                // ㄩㄠ not exists
                                // ㄩㄡ not exists
    {"m0", {"uan", "yuan"}},    // ㄩㄢ
    {"mp", {"un", "yun"}},      // ㄩㄣ
                                // ㄩㄤ not exists
    {"m/", {"iong", "yon"}},    // ㄩㄥ
                                // ㄩㄦ not exists    
};


string convertFromZhuyinToPingyin(const string& zhuyin){
    string retval;
    
    if(zhuyin == "") return "";

    // First find if it has a consonant
    if(consonantsMap.find(zhuyin.substr(0,1)) != consonantsMap.end()){
        // It does
        vector<string> result = consonantsMap.at(zhuyin.substr(0,1));
        
        // Check if this is the only symbol
        if(result.size() == 2 && zhuyin.size() == 1){
            return result[1];
        }
        else{
            retval += result[0];
        }

        // Find the rest rhymes_medials parts
        result = rhymes_medials_map.at(zhuyin.substr(1));

        // Whether result has size of 2 or 1, because it has a consonant, always use first result
        retval += result[0];
    }
    else{
        // It doesn't have a consonant, all of them are rhymes and medials
        vector<string> result = rhymes_medials_map.at(zhuyin);
        
        // Check if this is the only component
        if(result.size() == 2){
            return result[1];
        }
        else{
            retval += result[0];
        }
    }
    
    return retval;
}

string parseWholeString(const string& raw_str){
    string ret_val;     // Contain every decoded words
    string undecoded_word;   // Store undecoded word

    for(auto && each_char : raw_str){
        if(tonalSet.find(each_char) == tonalSet.end()){
            // Not tonal symbols
            undecoded_word += each_char;
        }
        else{
            // Meet the tonal marks, one word finished, decode it and append to return value
            ret_val += convertFromZhuyinToPingyin(undecoded_word);
            undecoded_word = "";
        }
    }

    return ret_val;
}


int main(){
    string input;
    cout << "請輸入錯誤輸入法的注音:";
    cin >> input;
    cout << parseWholeString(input) << endl;
    return 0;
}