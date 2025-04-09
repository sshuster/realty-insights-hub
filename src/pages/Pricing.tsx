
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  popular = false,
  buttonLabel = "Get Started" 
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[]; 
  popular?: boolean;
  buttonLabel?: string;
}) => {
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    toast.success(`You've selected the ${name} plan!`);
    navigate('/dashboard');
  };
  
  return (
    <Card className={`flex flex-col ${popular ? 'border-realty-500 shadow-lg relative' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-realty-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-realty-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubscribe}
          className={`w-full ${popular ? 'bg-realty-600 hover:bg-realty-700' : ''}`} 
          variant={popular ? 'default' : 'outline'}
        >
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  return (
    <Layout>
      <div className="space-y-10 py-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to enhance your real estate valuation skills and knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <PricingTier
            name="Basic"
            price="29"
            description="Perfect for beginners looking to learn real estate fundamentals"
            features={[
              "5 property valuations per month",
              "Access to basic courses",
              "Standard valuation accuracy",
              "Email support",
              "Mobile app access"
            ]}
          />
          
          <PricingTier
            name="Professional"
            price="59"
            description="Ideal for active real estate professionals and investors"
            features={[
              "25 property valuations per month",
              "Access to all courses and webinars",
              "Enhanced valuation accuracy",
              "Priority email support",
              "Mobile app access",
              "Market trend reports",
              "API access for basic integrations"
            ]}
            popular={true}
          />
          
          <PricingTier
            name="Enterprise"
            price="99"
            description="Comprehensive solution for agencies and teams"
            features={[
              "Unlimited property valuations",
              "Complete course & certification library",
              "Highest valuation accuracy",
              "24/7 priority support",
              "Mobile app access with team features",
              "Advanced analytics dashboard",
              "Full API access for integrations",
              "Custom valuation models",
              "Team management tools"
            ]}
            buttonLabel="Contact Sales"
          />
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, including Visa, Mastercard, American Express, 
                  and Discover. We also support PayPal and bank transfers for annual subscriptions.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Can I upgrade or downgrade my plan later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can change your subscription plan at any time. When upgrading, you'll be 
                  prorated for the remainder of your billing cycle. When downgrading, changes will 
                  take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Is there a free trial available?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 7-day free trial on the Professional plan so you can test our 
                  services before committing. No credit card is required for the trial.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">What's your refund policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied with our services 
                  within the first 30 days, contact our support team for a full refund.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Do you offer custom enterprise solutions?</h3>
                <p className="text-muted-foreground">
                  Yes, for larger organizations or teams with specific needs, we offer custom enterprise 
                  solutions. Contact our sales team to discuss your requirements and get a tailored quote.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="space-y-4 text-center">
                <p>Still have questions about our plans?</p>
                <Button variant="outline">Contact Support</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
