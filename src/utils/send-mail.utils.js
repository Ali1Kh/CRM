const path = require("path");
const nodemailer = require("nodemailer");

const pug = require("pug");

// import * as nodemailer from 'nodemailer';

// import { ResetMailTemplate } from './template';
const htmlToText = require("html-to-text");

export class Email {
  to;
  name;
  url;
  from;
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Support <${process.env["EMAIL_FROM"]}>`;
  }

  newTransport() {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c63f6d2f89341b",
        pass: "d4723a37552b8b",
      },
    });

    return transport;
  }

  // Send the actual email
  // async send(subject: any, htmlElement: any) {
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    // console.log(process.cwd());

    const templatePath = path.join(
      __dirname,
      `../email_templates/${template}.pug`
    );

    const html = pug.renderFile(templatePath, {
      name: this.name?.split(" ")[0] || this.name,
      url: this.url,
      subject,
    });

    // 2) Define email options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
}
