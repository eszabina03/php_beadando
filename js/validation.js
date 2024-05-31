const validation = new JustValidate("#regisztral");

validation.addField("#felhasznalo", [
    {
        rule: "required"
    }
    
]).addField("#email",[
    {
        rule:"required"
    },
    {
        rule:"email"
    },
    {
        validator : (value) => () => {
            fetch("val.php?email="+encodeURIComponent(value)).then(function(response){
                return response.json();
            }).then(function(json){
                return json.available
            });
        },
        errorMessage: "Ilyen email már létezik"
    }
]).addField("#jelszo",[
    {
        rule:"required"
    },
    {
        rule:"password"
    }
]).addField("#jelszo-megerosit",[
    {
        validator: (value, fields) =>{
            return value === fields["#jelszo"].elem.value;
        },
        errorMessage: "Nem egyezzik a két jelszó"
    }
]).onSuccess((event)=>{
    document.getElementById("kuld").submit();
});