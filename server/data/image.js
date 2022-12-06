export async function upload(image){
    await fetch(
        'https://api.cloudinary.com/v1_1/dcizjmtey/upload',
        {
            method: 'POST',
            body: image,
        }
    ).then((result)=>{
       console.log(result.json);
    })
}