// selecting page part to be edited
var menu = document.querySelector("#plates-menu");
var container = document.querySelector("#container");

// null var to put json data
var plates;

// getting JSON data
$.getJSON('plates_data', function(data) {
    // console.log(data);
    plates = data;

    // using map function to deliver each plate to html
    plates.map((plate, i) => {
        
        //getting the info from the API
        var plate_title = document.createTextNode(plate.name);
        var time_and_serves = plate.time+", "+plate.serves;
        var plate_time = document.createTextNode(time_and_serves);

        //plate-title
        var plate_title_div = document.createElement("h2");
        // plate_title_div.setAttribute("class", "plate-title");
        plate_title_div.appendChild(plate_title);

        //plate time and serves
        var time_serves_div = document.createElement("p");
        // time_serves_div.setAttribute("class", "plate-description");
        time_serves_div.appendChild(plate_time);

        // creating the an a tag for each plate in the menu
        var plate_class = document.createElement("a");
        plate_class.setAttribute("class", "plate");

        plate_class.setAttribute("onclick", `select_plate(event,${i})`);

        // selecting first plate to be default
        if (i == 0) {
            plate_class.setAttribute("id", "defaultOpen");
        }

        plate_class.appendChild(plate_title_div);
        plate_class.appendChild(time_serves_div);
        menu.appendChild(plate_class);

        // main-plate div
        var main_plate_div = document.createElement("div");
        main_plate_div.setAttribute("class", "main-plate");
        main_plate_div.setAttribute("id", i);

        // creating a main-header div
        var main_header_div = document.createElement("div");
        main_header_div.setAttribute("class", "main-header");

        // creating the main-header-info div
        var main_header_info_div = document.createElement("div");
        main_header_info_div.setAttribute("class", "main-header-info");

        // main page plate name
        var main_plate_name = document.createElement("div");
        main_plate_name.setAttribute("class", "main-plate-name");
        var main_plate_title = document.createTextNode(plate.name);
        main_plate_name.appendChild(main_plate_title);

        // appending plate name to main-header-info
        main_header_info_div.appendChild(main_plate_name);

        // stars
        var stars = document.createElement("div");
        stars.setAttribute("class", "stars");    

        // creating stars according to database rate
        for (var j = 0; j < plate.stars; j++) {
            var star = document.createElement("img");
            star.setAttribute("src", "./images/Star.svg");
            star.setAttribute("alt", "rate");
            stars.appendChild(star);
        }
        
        // appending stars to main-header-info
        main_header_info_div.appendChild(stars);

        
        //plate basic info
        var times_serves_address_div = document.createElement("div");
        times_serves_address_div.setAttribute("class", "time-serves-address");

        var time_p = document.createElement("p");
        var time_img = document.createElement("img");
        time_img.setAttribute("src", "./images/clock.svg");
        time_img.setAttribute("alt", "time");
        var time = document.createTextNode(plate.time);
        time_p.appendChild(time_img);
        time_p.appendChild(time);


        var serves_p = document.createElement("p");
        var serves_img = document.createElement("img");
        serves_img.setAttribute("src", "./images/plate.svg");
        serves_img.setAttribute("alt", "serves");
        var serves = document.createTextNode(plate.serves);
        serves_p.appendChild(serves_img);
        serves_p.appendChild(serves);


        var address_p = document.createElement("p");
        var address_img = document.createElement("img");
        address_img.setAttribute("src", "./images/fast-food.svg");
        address_img.setAttribute("alt", "address");
        var address = document.createTextNode(plate.address);
        address_p.appendChild(address_img);
        address_p.appendChild(address);

        // appending time, serves and address to times_serves_address_div
        times_serves_address_div.appendChild(time_p);
        times_serves_address_div.appendChild(serves_p);
        times_serves_address_div.appendChild(address_p);

        // appending times, serves and address to main-header-info
        main_header_info_div.appendChild(times_serves_address_div);

        // appending main_header_div to the main page
        main_header_div.appendChild(main_header_info_div);


        var plate_image = document.createElement("img");
        plate_image.setAttribute("src", plate.image);
        plate_image.setAttribute("alt", "plate");
        plate_image.setAttribute("class", "plate-image");

        main_header_div.appendChild(plate_image);  

        var main_other_info_div = document.createElement("div");
        main_other_info_div.setAttribute("class", "main-other-info");

        // ingredients
        var ingredients_div = document.createElement("div");
        ingredients_div.setAttribute("class", "ingredients");
        var ingredients_h3 = document.createElement("h3");
        var ingredients_title = document.createTextNode("Ingredients");
        ingredients_h3.appendChild(ingredients_title);

        var ingredients_ul = document.createElement("ul");


        for (var i = 0; i < plate.ingredients.length; i++) {
            var ingredients_li = document.createElement("li");
            var ingredient = document.createTextNode(plate.ingredients[i]);
            ingredients_li.appendChild(ingredient);
            ingredients_ul.appendChild(ingredients_li);
        }

        ingredients_div.appendChild(ingredients_h3);
        ingredients_div.appendChild(ingredients_ul);

        main_other_info_div.appendChild(ingredients_div);

        // instructions
        var instructions_div = document.createElement("div");
        instructions_div.setAttribute("class", "instructions");
        var instructions_h3 = document.createElement("h3");
        var instructions_title = document.createTextNode("Instructions");
        instructions_h3.appendChild(instructions_title);
        var instructions_p = document.createElement("p");
        var instructions_content = document.createTextNode(plate.instructions);
        instructions_p.appendChild(instructions_content);
        instructions_div.appendChild(instructions_h3);
        instructions_div.appendChild(instructions_p);
        main_other_info_div.appendChild(instructions_div);


        // appending main divs to container
        main_plate_div.appendChild(main_header_div);
        main_plate_div.appendChild(main_other_info_div);
        container.appendChild(main_plate_div);
    });
    
    // selecting default plate
    document.getElementById("defaultOpen").click();    
});

// tabs function
function select_plate(event, plate_id) {
    var i, main_plate, plate;
    main_plate = document.getElementsByClassName("main-plate");
    for (i=0; i < main_plate.length; i++) {
        main_plate[i].style.display = "none";
    }

    plate = document.getElementsByClassName("plate");
    for (i=0; i < plate.length; i++) {
        plate[i].className = plate[i].className.replace(" active","");
    }

    document.getElementById(plate_id).style.display = "block";
    event.currentTarget.className += " active";
};

// search-bar function
function searchPlate() {
    var input, filter, section, a, h2, i;

    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    section = document.getElementById("plates-menu");
    a = section.getElementsByClassName("plate");
    var active = section.getElementsByClassName("active");
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < a.length; i++) {
        h2 = a[i].getElementsByTagName("h2")[0];
        if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
          
        } else {
          a[i].style.display = "none";
        };
    };
};