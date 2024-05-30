package com.example.demo.Dto;

import java.time.LocalDateTime;

public class UserSessionDTO {
    private String userEmail;
    private LocalDateTime entryTime;
    private LocalDateTime exitTime;
    private String entryTimeFormatted;
    private String exitTimeFormatted;

    public UserSessionDTO(String userEmail, LocalDateTime entryTime, LocalDateTime exitTime, String entryTimeFormatted, String exitTimeFormatted) {
        this.userEmail = userEmail;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
        this.entryTimeFormatted = entryTimeFormatted;
        this.exitTimeFormatted = exitTimeFormatted;
    }

    // Getters and setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public LocalDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public String getEntryTimeFormatted() {
        return entryTimeFormatted;
    }

    public void setEntryTimeFormatted(String entryTimeFormatted) {
        this.entryTimeFormatted = entryTimeFormatted;
    }

    public String getExitTimeFormatted() {
        return exitTimeFormatted;
    }

    public void setExitTimeFormatted(String exitTimeFormatted) {
        this.exitTimeFormatted = exitTimeFormatted;
    }

    @Override
    public String toString() {
        return "Session [userEmail=" + userEmail + ", entryTime=" + entryTime + ", exitTime=" + exitTime + "]";
    }
}
