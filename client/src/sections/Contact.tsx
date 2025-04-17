import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  GitPullRequest,
  Linkedin,
  Twitter,
  Dribbble,
} from "lucide-react";
import * as THREE from "three";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const contact3DRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // React Hook Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest("POST", "/api/contact", data);

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    }
  };

  // Simple 3D contact decoration
  useEffect(() => {
    if (!contact3DRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(
      contact3DRef.current.clientWidth,
      contact3DRef.current.clientHeight,
    );
    contact3DRef.current.appendChild(renderer.domElement);

    // Create multiple small cubes
    const cubes: THREE.Mesh[] = [];
    const cubeSize = 0.3;
    const spread = 3;

    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          Math.random() * 0.5 + 0.5,
          Math.random() * 0.5,
          Math.random() * 0.5 + 0.5,
        ),
        transparent: true,
        opacity: 0.7,
      });

      const cube = new THREE.Mesh(geometry, material);

      // Random position
      cube.position.x = (Math.random() - 0.5) * spread;
      cube.position.y = (Math.random() - 0.5) * spread;
      cube.position.z = (Math.random() - 0.5) * spread;

      // Random rotation
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;

      scene.add(cube);
      cubes.push(cube);
    }

    camera.position.z = 4;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!contact3DRef.current) return;

      const newWidth = contact3DRef.current.clientWidth;
      const newHeight = contact3DRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (contact3DRef.current) {
        contact3DRef.current.removeChild(renderer.domElement);
      }

      cubes.forEach((cube) => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section id="contact" className="py-24 relative bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Let's discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-surface/50 p-8 rounded-xl border border-primary/10"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-background border-neutral/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="bg-background border-neutral/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-background border-neutral/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          className="bg-background border-neutral/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  disabled={form.formState.isSubmitting}
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>

          <div className="reveal">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="text-primary h-5 w-5 mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Pokhara, Nepal</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="text-primary h-5 w-5 mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@example.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        surajshre348@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="text-primary h-5 w-5 mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+11234567890"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +977 9814124516
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-heading font-semibold mb-6">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <GitPullRequest className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Dribbble className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* 3D contact decoration */}
              <div
                ref={contact3DRef}
                className="mt-12 w-full aspect-video relative"
                id="contact-3d-container"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
