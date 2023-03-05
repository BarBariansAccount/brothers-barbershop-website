const updateAbout="UPDATE About SET title = $1 WHERE 1=1";

const getAbout="Select title from About";





module.exports={
    updateAbout,
    getAbout
}
