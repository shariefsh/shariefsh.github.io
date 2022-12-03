
$.ajaxSetup({
    async: false
});
$(document).ready(function(){
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);

    var image_base_url = "https://s7nspfp.mypinata.cloud/ipfs/";
    var obj = {};
    $.get("https://shariefsh.github.io/class_project/json_data/"+ id.toString() +".json", function(data) {
        obj["name"] = data.name;
        obj["image"] = data.image;
        var attributes = data.attributes;
        var obj_attr = {};
        for (var j = 0; j < attributes.length; j++)
        {
            obj_attr[attributes[j].trait_type] = attributes[j].value;
        }
        obj["attributes"] = obj_attr;
        
    });
    console.log(obj);

    var image_url = image_base_url + obj["image"];

    $(".nft_image").attr("src",image_url);
    $(".nft_about").text(obj["name"]);

    var table = "<table>";
    // table = table + "<tr><td>Name</td><td>:   "+obj["name"]+"</td></tr>"
    var attributes = obj["attributes"];
    $.each(attributes,function(key,val){
        table = table + "<tr><td>"+key+"</td><td>:   "+val.toString()+"</td></tr>"
    });

    table = table + "</table>"
    $(".div_properties").html(table)


});