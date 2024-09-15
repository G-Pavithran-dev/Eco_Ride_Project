package com.example.car_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private MailSender mailSender;
    private SimpleMailMessage message;

    public int generateVerificationCode() {
        return (int) ((Math.random() * (999999 - 100000)) + 100000);
    }

    public void sendSignupMail(String email, int verificationCode) {
        // send mail to email
        this.message = new SimpleMailMessage();
        String htmlBody = "<h4>Welcome to Eco-Ride, " + email + "!</h4>"
                + "<p>We're thrilled to have you here! 🎉</p>"
                + "<p>Get ready to dive into our engaging and diverse learning community. You're now part of a group of brilliant, dedicated students who are here to make the most out of their education.</p>"
                + "<p>Before you get started, we need to verify your email address. Here's your verification code:</p>"
                + "<h2 style='color: #3498db;'>" + verificationCode + "</h2>"
                + "<p>Once verified, you'll have full access to all the resources available on Eco Ride.</p>"
                + "<p>If you have any questions, feel free to reach out to us at any time. We're here to help!</p>"
                + "<p>Happy Riding,<br>Team Eco Ride.</p>";

        message.setFrom("noreply@ecoride.com");
        message.setTo(email);
        message.setSubject("Welcome to Eco Ride");
        message.setText(htmlBody);

        mailSender.send(message);
        System.out.println("Signup Mail sent successfully");
    }

    public void otpVerifiedEmail(String email) {
        this.message = new SimpleMailMessage();
        String htmlBody = "<h1>Welcome to Eco Ride!</h1>"
                + "<p>Your email has been successfully verified. You now have access to all the resources available on Eco Ride.</p>"
                + "<p>If you have any questions, feel free to reach out to us at any time. We're here to help!</p>"
                + "<p>Happy Riding,<br>Team Eco Ride</p>";
        message.setFrom("admin@ecoride.com");
        message.setTo(email);
        message.setSubject("Welcome to Eco Ride");
        message.setText(htmlBody);
        mailSender.send(message);
        System.out.println("OTP Verified Mail sent successfully");
    }
}
