package com.cpd.ace.controller;

import com.cpd.ace.model.User;
import com.cpd.ace.repository.UserRepository;
import com.cpd.ace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public User getInfo(@RequestParam(value = "productId") int productId){
        return userService.getInfo(productId);
    }


    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userService.signup(user);
        return "회원가입 완료";
    }

    @PutMapping("/update")
    public String update(@RequestBody User user) {
        userService.updateUser(user);
        return "수정 완료";
    }
}
