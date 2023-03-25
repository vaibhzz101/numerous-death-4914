# numerous-death-4914
Project

#   [Auto-Mech](https://phenomenal-dolphin-df756c.netlify.app/)

 ## Auto-Mech is a clone of Firestone which sales Tires,automobile-parts and provdies services.

--

<br>

# Frontend Of Auto-Mech: 

<br>

For Frontend is designed `HTML` `CSS` and `JavaScript`. <br>
Externally library used in FireWheel `Bootstrap`.

* Home page
* products page
* Login page
* Signup page
* Admin panel
       



# backend of Auto-Mech-> [BaseURL](https://elegant-gold-starfish.cyclic.app/)

## npm packages used in Auto-Mech

   * express     : for setup the server 
   * mongoose    : for makign connections between server and mongodb
   * JWT         : for jwt authentication
   * bcrypt      : for encrypting the password

## Database

   * MongoDB     : for storing details 

* nodemon 
 
<br>
 <hr>
<br>

  

# API endpoints

## user
```javascript
    login    ->    localhost:8900/users/login    {post}
    register ->    localhost:8900/users/register  {post}
```

## product
```javascript
    getall      ->   localhost:8900/products/
    getById     ->   localhost:8900/products/:id
    update      ->   localhost:8900/products/update/:id
    delete      ->   localhost:8900/products/delete/:id
    filter      ->   localhost:8900/products/filter?product_rating
    find qurey  ->   localhost:8900/products/?product_name=vaibhav (anything from schema)
```

---

## body for update or create new 

Method :  post -> localhost:3500/products/add

```javascript
    {
    "product_id": 332,
    "product_img": "https://assets.firestonecompleteautocare.com/content/dam/bsro-sites/global/images/tires/full-60/h175/TuranzaEL40002RFT.png",
    "brand_img": "https://assets.firestonecompleteautocare.com/content/dam/bsro-sites/global/images/tires/brands/Bridgestone_logo.png",
    "product_name": "VAIBHAV SHEVNE",
    "average_rating": "",
    "review_count": "",
    "product_specs": "chikkuuu",
    "stability": "Stability: vaibhavk",
    "traction": "Traction: ",
    "dry_traction": "Dry Traction: ",
    "ride_comfort": "Ride Comfort: ",
    "tire_wear": "Tire Wear: ",
    "wet_traction": "Wet Traction: ",
    "noise_level": "Noise Level: ",
    "__v": 0
    }
```

## cart

```javascript
    getall ->   localhost:8900/cart/
    add    ->   localhost:8900/cart/add
    delete ->   localhost:8900/cart/delete/:id
```
# cart flow design
![cartoperations](https://user-images.githubusercontent.com/87657007/213551092-2d5992b1-29f2-4731-9174-efad13874eb5.png)

 




