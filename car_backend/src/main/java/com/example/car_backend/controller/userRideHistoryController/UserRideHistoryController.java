package com.example.car_backend.controller.userRideHistoryController;

import org.springframework.web.bind.annotation.RestController;

import com.example.car_backend.model.UserDetails;
import com.example.car_backend.model.bookRide.BookRide;
import com.example.car_backend.model.userRideHistory.UserRideHistory;
import com.example.car_backend.repository.userRideHistoryRepo.UserRideHistoryRepo;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;





@RestController
public class UserRideHistoryController {
    @Autowired
    private UserRideHistoryRepo repo;
    @GetMapping("/app/userRideHistory/getall")
    public List<UserRideHistory> getMethodName() {
        return  repo.findAll();
    }
    @GetMapping("/app/userRideHistory/getByDriver/{id}/{status}")
    public UserRideHistory getByDriverUpcoming(@PathVariable("id") int id,@PathVariable("status")String status) {
        return repo.findDriverVyId(id,status);
    }
    @GetMapping("/app/userRideHistory/getByUser/{email}/{status}")
    public List<UserRideHistory> getByUserUpcoming(@PathVariable("email") String email,@PathVariable("status")String status) {
        return repo.findUserRideHistoryByEmail(email,status);
    }
    @GetMapping("/app/userRideHistory/getDriverByemail/{email}/{status}")
    public List<UserRideHistory> getByDriver(@PathVariable("email") String email,@PathVariable("status")String status) {
        System.out.println("kjdkdkd");
        return repo.findDriverRideHistoryByEmail(email,status);
    }

    @GetMapping("/app/userRideHistory/getAllRideID/completed/{email}")
    public List<Integer> getALLRideID(@PathVariable("email") String email) {
        return repo.findAllCompletedRideId(email);
    }
    
    


    @PostMapping("/app/userRideHistory/{email}/{id}")
    public UserRideHistory postMethodName(@PathVariable("email") String email,@PathVariable("id") int id) {
        UserRideHistory m=new UserRideHistory();
        UserDetails u=new UserDetails();
        BookRide b=new BookRide();
        u.setEmail(email);
        b.setId(id);
        m.setBookRide(b);
        m.setUserDetails(u);
        m.setStatus("upcoming");
        repo.save(m);
        return m;
    }
    @DeleteMapping("/app/deleteRide/{email}/{id}")
    public void deleteRide(@PathVariable("email") String email,@PathVariable("id") int id) {
        
        repo.cancelRide(email,id);
    }
    // http://localhost:8080/app/updateRide/727722euit096@skcet.ac.in/5/completed
    
    @PutMapping("/app/updateRide/ById/{id}/{status}")
    public UserRideHistory putToCompletedOrOngoing(@PathVariable("id") int id,@PathVariable("status")String status) {
        //TODO: process PUT request
        List<UserRideHistory> u=repo.findRides(id);
        
        for(UserRideHistory k:u)
        {
            k.setStatus(status);
            repo.save(k);

        }
        
        return u.get(0);
        
        
    }
}
