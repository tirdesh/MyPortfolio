import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = document.createElement("form");
    form.method = "POST";
    form.action =
      "https://docs.google.com/forms/d/e/1FAIpQLSdLUKWmiRwPGb6f9qC1k-t1-M3ynSFHu_2_hvt-A5cBn_wINA/formResponse";
    form.target = "hidden_iframe";

    const nameField = document.createElement("input");
    nameField.type = "hidden";
    nameField.name = "entry.232489924";
    nameField.value = name;
    form.appendChild(nameField);

    const emailField = document.createElement("input");
    emailField.type = "hidden";
    emailField.name = "entry.373115972";
    emailField.value = email;
    form.appendChild(emailField);

    const messageField = document.createElement("input");
    messageField.type = "hidden";
    messageField.name = "entry.1291361975";
    messageField.value = message;
    form.appendChild(messageField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 min-h-[calc(100vh-12rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <motion.h1
              className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Contact Me
            </motion.h1>
            {submitted ? (
              <p className="text-green-500 text-center">
                Thank you for your message! I'll get back to you soon.
              </p>
            ) : (
              <motion.form
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Send Message
                </Button>
              </motion.form>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
    </div>
  );
};

export default Contact;
