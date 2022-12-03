var my_json_data = [];
var json_data_attributes = {};
$.ajaxSetup({
    async: false
});
$(document).ready(function(){  
    read_json_data();
    var first_10_data = my_json_data.slice(0,10);
    build_gallery(first_10_data);
    build_attr_obj();
    create_filter_menu();
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
    }

    $(".checkbox_filter").change(function(){
        console.log("calling function filter data");
        filter_data();
    });

    $("#btn_search").click(function(){
        search_function();
    });

    $("#btn_clear").click(function(){
        clear();
    });
    
});

function read_json_data(){
    for(var i = 0; i < 100; i ++)
    {
        $.get("https://shariefsh.github.io/class_project/json_data/"+ i.toString() +".json", function(data) {
            //console.log(data);
            var obj = {};
            obj["name"] = data.name;
            obj["image"] = data.image;
            var attributes = data.attributes;
            var obj_attr = {};
            //console.log(attributes.length);
            for (var j = 0; j < attributes.length; j++)
            {
                obj_attr[attributes[j].trait_type] = attributes[j].value;
            }
            obj["attributes"] = obj_attr;
            my_json_data.push(obj);
            // console.log(my_json_data);
            // console.log(my_json_data[0]["attributes"]["Accessories"]);
            
            // if(my_json_data[0]["attributes"].hasOwnProperty('Accessories')){
            //     console.log('Key is exist in Object!');
            //  }else{
            //     console.log('Key is not exist in Object!');
            //  }
        });
    }
    console.log(my_json_data);
}

function build_gallery(first_10_data){
    //console.log(first_10_data);
    var html_string = "";
    //https://s7nspfp.mypinata.cloud/ipfs/QmWXGwFKN7C1Uco6teN2tcxchj7XhGzQQjEc1kASYqmnjR
    var image_base_url = "https://s7nspfp.mypinata.cloud/ipfs/";
    for(var i = 0; i < first_10_data.length; i++)
    {
        var image_url = image_base_url + first_10_data[i]["image"];
        //console.log(image_url);
        //var name = first_10_data[i][]
        var name = first_10_data[i]["name"];
        name = $.trim(name);
        var json_id = name.slice(-1);

        div_imgage_string = '<div class="image_gallery">'+
            '<a id='+json_id+' href="nft_detail.html?id='+json_id+'"><img src='+image_url+' alt="QmWXGwFKN7C1Uco6teN2tcxchj7XhGzQQjEc1kASYqmnjR"></a>' + 
            '<div class="image_content"><span>'+first_10_data[i]["name"]+'</span></div>' +
            '</div>';

    //     <div class="image_gallery">
    //   <a target="_blank" href="">
    //     <img src="./nft/logo-1.png" alt="QmWXGwFKN7C1Uco6teN2tcxchj7XhGzQQjEc1kASYqmnjR">
    //   </a>
    //   <div class="image_content"><span>S7NS #0</span></div>
    // </div>

        html_string = html_string + div_imgage_string;
    }
    $(".div_gallery").html(html_string);
    $(".green").html(html_string);
}

function build_attr_obj(){
    console.log("function called : build_attr_obj")
    var keys = [];
    
    $.each(my_json_data, function(index,data){
        var attributes = data["attributes"];
        $.each(attributes,function(key,val){
            if(keys.indexOf(key) == -1)
            {
                keys.push(key);
                json_data_attributes[key] = [val];
            }
            else {
                var key_arr = json_data_attributes[key];
                if (key_arr.indexOf(val) == -1)
                {
                    key_arr.push(val);
                    json_data_attributes[key] = key_arr;
                }
            }
        });
       
    });
    console.log(json_data_attributes);
}

function create_filter_menu(){
    var filter_menu = "";
    $.each(json_data_attributes,function(key,data){

        filter_menu = filter_menu + '<button class="accordion">'+key+'</button>';
        filter_menu = filter_menu + '<div class="panel">';
        $.each(data, function(i,val){
            filter_menu = filter_menu + '<div class="row">';
            filter_menu = filter_menu + "<input type='checkbox' class='checkbox_filter' value='"+val.toString()+"' name='"+key.toString()+"'>";
            filter_menu = filter_menu + "<label for='"+val.toString()+"'>"+val.toString()+"</label>";
            filter_menu = filter_menu + '</div>';
        });

        filter_menu = filter_menu + '</div>';
    });
    $(".child").html(filter_menu);
}

function filter_data(){
    // var ischecked = $(".checkbox_filter").is(":checked");
    // console.log(ischecked);
    // console.log($(".checkbox_filter").val());
    var obj_filter = {};
    
    $('.checkbox_filter:checkbox:checked').each(function(){
        
        obj_filter[$(this).attr("name")] = $(this).val();
    });
    console.log(obj_filter);
    
}

function search_function(){
    var search_val = $("#txt_search").val();
    var data = my_json_data.filter(x => x.name.toLowerCase().includes($.trim(search_val.toLowerCase())));
    console.log(data);
    var fisrt_10 = data.slice(0,10);
    console.log(fisrt_10);
    build_gallery(fisrt_10);
}

function clear(){
    $("#txt_search").val("");
    var first_10_data = my_json_data.slice(0,10);
    build_gallery(first_10_data);
}




















// var my_json_data = [];

// $( document ).ready(function() {
//     const testFolder = './json/data/';
//     const fs = require('fs');
//     fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//         console.log(file);
//     });
//     });
    

//     var loc = window.location.pathname;
//     alert(loc);
//     var dir = loc.substring(0, loc.lastIndexOf('/'));
//     var json_dir = dir + "/json/data/0.json";
//     build_array(json_dir);

// });

// function build_array(json_dir){
//     console.log(json_dir);
//     //E:/ComputerSceince/Sem4/Front-end/Assignments/Class_Project/json/data/0.json
//     $.getJSON("json/data/0.json", function( data ) {
//         var items = {};
//         $.each( data, function( key, val ) {
//             items[key] = val;
//         });
//         my_json_data.push(items);
//         console.log(my_json_data);
//       });
// };