package com.cpd.ace.service;

import com.cpd.ace.model.User;
import com.cpd.ace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public void signup(User user){
        userRepository.save(user);
    }

    public User getInfo(int productId){
        return userRepository.findByProductId(productId);
    }

    public void updateUser(User user){
        userRepository.save(user);
    }
}
