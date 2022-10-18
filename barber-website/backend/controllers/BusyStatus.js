let busy = false;
let notBusy= false;
let empty =true;

const getStatus = (req,res)=>{
    if(busy){
        res.status(200).send("Busy");
    }
    else if(notBusy){
        res.status(200).send("Not Busy");
    }
    else if(empty){
        res.status(200).send("Empty");
    }
}

const updateStatus = (req,res) =>{
    let Status = req.body.Status;

    if(Status == "Busy"){
        busy=true;
        notBusy=false;
        empty=false;
        res.status(200).send("Status is set to: Busy");
    }
    else if(Status == "Not Busy"){
        notBusy=true;
        busy=false;
        empty=false;
        res.status(200).send("Status is set to: Not Busy");
    }
    else if (Status == "Empty"){
        empty=true;
        busy=false;
        notBusy=false;
        res.status(200).send("Status is set to: Empty");

    }
}

module.exports={
    updateStatus,
    getStatus
}
