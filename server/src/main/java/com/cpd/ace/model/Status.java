package com.cpd.ace.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "productId")
    private User user;

    @CreationTimestamp
    private Timestamp date;

    @Column(nullable = false)
    private Enum.Time time;

    @Column(nullable = false)
    private boolean intakeChk;

    @Column(nullable = false)
    private Enum.Condition conditions;
}
