
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Contact Us</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Get in touch with our agricultural experts. We're here to support your farming journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <MapPin className="mr-2" />
                  Africa Office - Nairobi, Kenya
                </CardTitle>
                <CardDescription>Our regional headquarters for African operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-stone-600">Sky Park Plaza Westlands</p>
                    <p className="text-stone-600">P.O. Box 7773, 00200 Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-stone-600">+254 20 208 9181</p>
                    <p className="text-stone-600">+254 20 208 9182</p>
                    <p className="text-stone-600">+254 (0) 111 410 639</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-stone-600">Info@agrikima.co.ke</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <MapPin className="mr-2" />
                  Manufacturing Facility - Malaysia
                </CardTitle>
                <CardDescription>Our state-of-the-art production facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-stone-600">A63, Jalan FZ2, Precint 3</p>
                    <p className="text-stone-600">KS12 42920, Klang, Selangor, Malaysia</p>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Strategic Location:</strong> Located in Port Klang for seamless global shipping
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Clock className="mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM EAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM EAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  <div className="text-sm text-green-600 mt-3">
                    Emergency support available 24/7 for urgent farming needs
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="border-stone-300 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-stone-300 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 XXX XXX XXX"
                        className="border-stone-300 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Farm/Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your farm or company name"
                        className="border-stone-300 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-stone-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="training">Farmer Training</option>
                      <option value="distribution">Distribution Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your farming needs, challenges, or how we can help you..."
                      rows={6}
                      required
                      className="border-stone-300 focus:border-green-500"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-green-200 text-center">
                <CardContent className="p-4">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Call Us</h3>
                  <p className="text-sm text-stone-600">Immediate assistance</p>
                  <p className="text-green-600 font-semibold">+254 20 208 9181</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 text-center">
                <CardContent className="p-4">
                  <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Email Us</h3>
                  <p className="text-sm text-stone-600">Detailed inquiries</p>
                  <p className="text-green-600 font-semibold">Info@agrikima.co.ke</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
