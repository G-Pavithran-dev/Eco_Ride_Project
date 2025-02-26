package com.example.car_backend.controller.bookRide;

import org.springframework.web.bind.annotation.RestController;

import com.example.car_backend.model.bookRide.BookRide;
import com.example.car_backend.repository.bookRide.BookRideRepo;
import com.example.car_backend.service.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;;

/**
 * BookRideController
 */
@RestController
public class BookRideController {
    @Autowired
    BookRideRepo repo;

    @Autowired
    protected MailService mailService;

    @GetMapping("/app/bookride/getallrides")
    public List<BookRide> getMethodName() {
        return repo.findAllCompleted();
    }

    @GetMapping("/app/bookride/selectedValue/{id}")
    public Optional<BookRide> getSelectedRideDetails(@PathVariable("id") int id) {
        return repo.findById(id);
    }

    @GetMapping("/app/bookride/Driver/{email}")
    public List<BookRide> getSelectedRideDetailsby(@PathVariable String email) {
        return repo.findByEmail(email);
    }

    @PutMapping("/app/bookride/updateRideCompletionStatus/{id}")
    public void updateRideCompletionStatus(@PathVariable("id") int id) {

        Optional<BookRide> optionalBookRide = repo.findById(id);

        if (optionalBookRide.isPresent()) {
            BookRide p = optionalBookRide.get();
            int seats = p.getAvailableSeats();
            if (seats > 0) {
                seats -= 1;
                p.setAvailableSeats(seats);
            }
            if (seats <= 0) {
                p.setRideCompletionStatus("yes");
            }
            repo.save(p);
        }

    }

    @PutMapping("/app/bookride/updateseatsAvailable/onCancelation/{id}")
    public void updateseatsAvailableonCancelation(@PathVariable("id") int id) {

        Optional<BookRide> optionalBookRide = repo.findById(id);

        if (optionalBookRide.isPresent()) {
            BookRide p = optionalBookRide.get();
            int seats = p.getAvailableSeats();
            seats += 1;
            p.setAvailableSeats(seats);
            repo.save(p);
        }

    }

    @PostMapping("/app/bookRide/getALLRide/Byid")
    public List<BookRide> getMethodNam(@RequestBody List<String> allId) {
        System.out.println(allId);
        System.out.println(allId);
        System.out.println(allId);
        System.out.println(allId);
        System.out.println(allId);
        System.out.println(allId);
        List<Integer> allIdInt = new ArrayList<>();

        for (String id : allId) {
            allIdInt.add(Integer.parseInt(id));
        }
        return repo.findByRideIds(allIdInt);
    }

    @PostMapping("/app/bookride/filter")
    public List<BookRide> getFilters(@RequestBody List<List<String>> s) throws Exception {
        List<String> l = s.get(0);
        List<String> g = s.get(1);
        if (l.size() > 0 && g.size() > 0) {
            return repo.filterdRides(s.get(0), s.get(1));
        } else if (l.size() > 0) {
            return repo.filterdRidesLeavingFrom(l);
        } else {
            return repo.filterdRidesGoingTo(g);

        }

    }

    @PostMapping("/app/createride")
    public BookRide createAnRide(@RequestBody BookRide bookRide) {
        bookRide.setRideCompletionStatus("no");
        mailService.sendNewRideNotification(bookRide);
        return repo.save(bookRide);
    }

}