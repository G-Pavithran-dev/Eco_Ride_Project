package com.example.car_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.example.car_backend.model.bookRide.BookRide;

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
        message.setFrom("no-reply@ecoride.com");
        message.setTo(email);
        message.setSubject("Welcome to Eco Ride");
        message.setText(htmlBody);
        mailSender.send(message);
        System.out.println("OTP Verified Mail sent successfully");
    }

    public void sendNewRideNotification(BookRide rideDetails) {
        this.message = new SimpleMailMessage();
        String htmlBody = "<h1>New Ride Available!</h1>"
                + "<p>Dear User,</p>"
                + "<p>We are excited to inform you about a new ride available on Eco Ride. Below are the details:</p>"
                + "<ul>"
                + "<li><strong>Driver Name:</strong> " + rideDetails.getName() + "</li>"
                + "<li><strong>Leaving From:</strong> " + rideDetails.getLeaving() + "</li>"
                + "<li><strong>Going To:</strong> " + rideDetails.getGoing() + "</li>"
                + "<li><strong>Available Seats:</strong> " + rideDetails.getAvailableSeats() + "</li>"
                + "<li><strong>Price:</strong> ₹. " + rideDetails.getPrice() + "</li>"
                + "<li><strong>Car Name:</strong> " + rideDetails.getCarName() + "</li>"
                + "<li><strong>Car Number:</strong> " + rideDetails.getCarNumber() + "</li>"
                + "<li><strong>Date:</strong> " + rideDetails.getDate() + "</li>"
                + "<li><strong>Start Time:</strong> " + rideDetails.getStartTime() + "</li>"
                + "</ul>"
                + "<p>Book your ride now and enjoy a comfortable journey with Eco Ride!</p>"
                + "<p><a href=`http://localhost:5173/bookRide` style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;'>Book Now</a></p>"
                + "<p>If the button above does not work, please <a href=`http://localhost:5173/bookRide'>click here</a>.</p>"
                + "<p>Happy Riding,<br>Team Eco Ride</p>";
        message.setFrom("updates@ecoride.com");
        message.setTo("727722euit126@skcet.ac.in");
        message.setSubject("New Ride Available on Eco Ride");
        message.setText(htmlBody);
        mailSender.send(message);
        System.out.println("Notification of new ride sent successfully");
    }
}
