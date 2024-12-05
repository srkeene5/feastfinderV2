// src/backend/models/notificationSubscription.js
import mongoose from 'mongoose';

const notificationSubscriptionSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: { 
    type: String, 
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  preferences: {
    securityUpdates: {
      type: Boolean,
      default: true,
    },
    accountIssues: {
      type: Boolean,
      default: true,
    },
    serviceOutages: {
      type: Boolean,
      default: true,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Index for quick lookups
notificationSubscriptionSchema.index({ userID: 1 });
notificationSubscriptionSchema.index({ email: 1 });
notificationSubscriptionSchema.index({ isActive: 1 });

// Middleware to validate email format
notificationSubscriptionSchema.pre('save', function(next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    next(new Error('Invalid email format'));
  }
  next();
});

// Static method to find active subscriptions
notificationSubscriptionSchema.statics.findActiveSubscriptions = function() {
  return this.find({ isActive: true });
};

// Instance method to update preferences
notificationSubscriptionSchema.methods.updatePreferences = function(newPreferences) {
  this.preferences = {
    ...this.preferences,
    ...newPreferences
  };
  return this.save();
};

// Instance method to deactivate subscription
notificationSubscriptionSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

const NotificationSubscription = mongoose.model('NotificationSubscription', notificationSubscriptionSchema);

export default NotificationSubscription;