import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// infos à obtenir sur le "https://developers.google.com/oauthplayground" et le console cloud plateform
const clientId = '1049950630469-t0rq8nrgvnjb8i8clj44ghvge0jofk4d.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04uLynpdPb9-mCgYIARAAGAQSNwF-L9Irs-eDCPJpyxIloLAv44_iCQu7Y_COCHRCJfRmcn1-czUa6Z6XfhvdyOYwkMI1vtuiebs';
const accessToken = 'ya29.a0AVA9y1uESOx3HHAWbwg5zbYEUITFQdgx2Nr49zR6YwsOx9JyeOkO3SPoH582jirQTJjnxoj8ejrkF1BUZZQnW-xOTsGY3kxEwo18BZgI8ZZNuYb2SNbe0vfVOFG-UYpWwLYaLOXpWQabFpjvxfShmKbIQya9aCgYKATASARISFQE65dr8TTo83fD4sB6nvc3d3mGRMQ0163';

// export de ce fichier sous une fonction anonyme, cette fonction sera appelé dans la fonction controller "create" juste aprés son enregistrement dans la
export default (mailTo, subject, title, text, uuid) => {

    const oauth2Client = new OAuth2(
        clientId, clientSecret, "https://developers.google.com/oauthplayground"
    )
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

   console.log(mailTo, subject, title, text, uuid);           
        
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "devtest14r@gmail.com", // le mail de l'user autorisé sur la plateforme google cloud 
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    })

    const mailOptions = { 
        from: '<game-over@gmail.com>', // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: `<b>${title}</b><p>${text}<p><a href='http://localhost:3000/entry/validateAccount/${uuid}'>Valider mon compte</a>`, // qui sera un lien dans le mail qui emmènera l'user qui a cliqué dessus sur votre front, un composant qui s'occupera d'effectuer une requete vers une route de votre api-back, celle-ci mettra à jour une valeur lié au champ de l'user dans la bdd, exemple : isAccountValidated -> "yes", maintenant l'enregistrement de l'user sera complet et pourra accéder aux routes "protégées" 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        });
}