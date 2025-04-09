
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Building, 
  Home, 
  BarChart3, 
  Ruler, 
  Calendar, 
  DollarSign,
  Building2,
  MapPin,
  Bed,
  Bath,
  Calculator,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from "@/components/ui/sonner";

const PropertyValuation = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [valuationResult, setValuationResult] = useState<number | null>(null);
  
  // Residential property state
  const [residentialForm, setResidentialForm] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    yearBuilt: 2010,
    lotSize: 0.25,
    hasGarage: true,
    hasPool: false,
    condition: 'good'
  });

  // Commercial property state
  const [commercialForm, setCommercialForm] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertySubtype: 'office',
    squareFeet: 5000,
    yearBuilt: 2000,
    numFloors: 1,
    parkingSpaces: 20,
    occupancyRate: 90,
    annualIncome: 200000,
    annualExpenses: 80000
  });

  // Handle form changes for residential properties
  const handleResidentialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setResidentialForm({
      ...residentialForm,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Handle form changes for commercial properties
  const handleCommercialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setCommercialForm({
      ...commercialForm,
      [name]: value
    });
  };

  // Calculate residential property valuation
  const calculateResidentialValuation = () => {
    if (!residentialForm.address || !residentialForm.city || !residentialForm.state || !residentialForm.zipCode) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Simple mock calculation for residential property
    const baseValue = residentialForm.squareFeet * 200;
    const bedroomValue = residentialForm.bedrooms * 15000;
    const bathroomValue = residentialForm.bathrooms * 10000;
    const ageAdjustment = (2025 - residentialForm.yearBuilt) * 500;
    const lotSizeValue = residentialForm.lotSize * 100000;
    
    let amenitiesValue = 0;
    if (residentialForm.hasGarage) amenitiesValue += 25000;
    if (residentialForm.hasPool) amenitiesValue += 35000;
    
    const conditionMultiplier = 
      residentialForm.condition === 'excellent' ? 1.2 :
      residentialForm.condition === 'good' ? 1.0 :
      residentialForm.condition === 'fair' ? 0.8 : 0.6;
    
    const totalValue = (baseValue + bedroomValue + bathroomValue + lotSizeValue + amenitiesValue - ageAdjustment) * conditionMultiplier;
    
    setValuationResult(Math.round(totalValue));
    toast.success("Valuation calculated successfully");
  };

  // Calculate commercial property valuation
  const calculateCommercialValuation = () => {
    if (!commercialForm.address || !commercialForm.city || !commercialForm.state || !commercialForm.zipCode) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Simple mock calculation for commercial property
    const netOperatingIncome = commercialForm.annualIncome - commercialForm.annualExpenses;
    const capRate = 
      commercialForm.propertySubtype === 'office' ? 0.06 :
      commercialForm.propertySubtype === 'retail' ? 0.065 :
      commercialForm.propertySubtype === 'industrial' ? 0.07 : 0.08;
    
    const incomeValue = netOperatingIncome / capRate;
    
    const squareFootValue = 
      commercialForm.propertySubtype === 'office' ? 250 :
      commercialForm.propertySubtype === 'retail' ? 200 :
      commercialForm.propertySubtype === 'industrial' ? 120 : 150;
    
    const replacementValue = commercialForm.squareFeet * squareFootValue;
    
    const occupancyFactor = commercialForm.occupancyRate / 100;
    
    const totalValue = (incomeValue * 0.7 + replacementValue * 0.3) * occupancyFactor;
    
    setValuationResult(Math.round(totalValue));
    toast.success("Valuation calculated successfully");
  };

  // Save valuation
  const saveValuation = () => {
    toast.success("Valuation saved successfully");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Property Valuation</h1>
            <p className="text-muted-foreground">
              Calculate the estimated market value of residential and commercial properties
            </p>
          </div>
        </div>

        <Tabs defaultValue="residential" onValueChange={setPropertyType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="residential" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Residential</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Commercial</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Residential Valuation Form */}
          <TabsContent value="residential">
            <Card>
              <CardHeader>
                <CardTitle>Residential Property Valuation</CardTitle>
                <CardDescription>
                  Enter property details to calculate an estimated market value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Property Address*</Label>
                      <Input 
                        id="address" 
                        name="address"
                        placeholder="123 Main St" 
                        value={residentialForm.address}
                        onChange={handleResidentialChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City*</Label>
                        <Input 
                          id="city" 
                          name="city"
                          placeholder="New York" 
                          value={residentialForm.city}
                          onChange={handleResidentialChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State*</Label>
                        <Input 
                          id="state" 
                          name="state"
                          placeholder="NY" 
                          value={residentialForm.state}
                          onChange={handleResidentialChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code*</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode"
                        placeholder="10001" 
                        value={residentialForm.zipCode}
                        onChange={handleResidentialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setResidentialForm({...residentialForm, bedrooms: Math.max(1, residentialForm.bedrooms - 1)})}
                        >
                          -
                        </Button>
                        <Input 
                          id="bedrooms" 
                          name="bedrooms"
                          type="number" 
                          value={residentialForm.bedrooms}
                          onChange={handleResidentialChange}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setResidentialForm({...residentialForm, bedrooms: residentialForm.bedrooms + 1})}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setResidentialForm({...residentialForm, bathrooms: Math.max(1, residentialForm.bathrooms - 0.5)})}
                        >
                          -
                        </Button>
                        <Input 
                          id="bathrooms" 
                          name="bathrooms"
                          type="number" 
                          step="0.5"
                          value={residentialForm.bathrooms}
                          onChange={handleResidentialChange}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setResidentialForm({...residentialForm, bathrooms: residentialForm.bathrooms + 0.5})}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input 
                        id="yearBuilt" 
                        name="yearBuilt"
                        type="number" 
                        placeholder="2010" 
                        value={residentialForm.yearBuilt}
                        onChange={handleResidentialChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="squareFeet">Square Feet</Label>
                      <Input 
                        id="squareFeet" 
                        name="squareFeet"
                        type="number" 
                        placeholder="1500" 
                        value={residentialForm.squareFeet}
                        onChange={handleResidentialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lotSize">Lot Size (acres)</Label>
                      <Input 
                        id="lotSize" 
                        name="lotSize"
                        type="number" 
                        step="0.01"
                        placeholder="0.25" 
                        value={residentialForm.lotSize}
                        onChange={handleResidentialChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Garage</Label>
                      <div className="flex gap-4">
                        <Button 
                          variant={residentialForm.hasGarage ? "default" : "outline"}
                          className={residentialForm.hasGarage ? "bg-realty-600 hover:bg-realty-700" : ""}
                          onClick={() => setResidentialForm({...residentialForm, hasGarage: true})}
                        >
                          Yes
                        </Button>
                        <Button 
                          variant={!residentialForm.hasGarage ? "default" : "outline"}
                          className={!residentialForm.hasGarage ? "bg-realty-600 hover:bg-realty-700" : ""}
                          onClick={() => setResidentialForm({...residentialForm, hasGarage: false})}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Pool</Label>
                      <div className="flex gap-4">
                        <Button 
                          variant={residentialForm.hasPool ? "default" : "outline"}
                          className={residentialForm.hasPool ? "bg-realty-600 hover:bg-realty-700" : ""}
                          onClick={() => setResidentialForm({...residentialForm, hasPool: true})}
                        >
                          Yes
                        </Button>
                        <Button 
                          variant={!residentialForm.hasPool ? "default" : "outline"}
                          className={!residentialForm.hasPool ? "bg-realty-600 hover:bg-realty-700" : ""}
                          onClick={() => setResidentialForm({...residentialForm, hasPool: false})}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Property Condition</Label>
                      <select
                        id="condition"
                        name="condition"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={residentialForm.condition}
                        onChange={handleResidentialChange}
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button 
                  className="bg-realty-600 hover:bg-realty-700"
                  onClick={calculateResidentialValuation}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Valuation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Commercial Valuation Form */}
          <TabsContent value="commercial">
            <Card>
              <CardHeader>
                <CardTitle>Commercial Property Valuation</CardTitle>
                <CardDescription>
                  Enter commercial property details to calculate an estimated market value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commercial-address">Property Address*</Label>
                      <Input 
                        id="commercial-address" 
                        name="address"
                        placeholder="123 Business Ave" 
                        value={commercialForm.address}
                        onChange={handleCommercialChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commercial-city">City*</Label>
                        <Input 
                          id="commercial-city" 
                          name="city"
                          placeholder="New York" 
                          value={commercialForm.city}
                          onChange={handleCommercialChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commercial-state">State*</Label>
                        <Input 
                          id="commercial-state" 
                          name="state"
                          placeholder="NY" 
                          value={commercialForm.state}
                          onChange={handleCommercialChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commercial-zipCode">Zip Code*</Label>
                      <Input 
                        id="commercial-zipCode" 
                        name="zipCode"
                        placeholder="10001" 
                        value={commercialForm.zipCode}
                        onChange={handleCommercialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertySubtype">Property Type</Label>
                      <select
                        id="propertySubtype"
                        name="propertySubtype"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={commercialForm.propertySubtype}
                        onChange={handleCommercialChange}
                      >
                        <option value="office">Office</option>
                        <option value="retail">Retail</option>
                        <option value="industrial">Industrial</option>
                        <option value="multifamily">Multi-Family</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commercial-yearBuilt">Year Built</Label>
                      <Input 
                        id="commercial-yearBuilt" 
                        name="yearBuilt"
                        type="number" 
                        placeholder="2000" 
                        value={commercialForm.yearBuilt}
                        onChange={handleCommercialChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commercial-squareFeet">Square Feet</Label>
                      <Input 
                        id="commercial-squareFeet" 
                        name="squareFeet"
                        type="number" 
                        placeholder="5000" 
                        value={commercialForm.squareFeet}
                        onChange={handleCommercialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numFloors">Number of Floors</Label>
                      <Input 
                        id="numFloors" 
                        name="numFloors"
                        type="number" 
                        placeholder="1" 
                        value={commercialForm.numFloors}
                        onChange={handleCommercialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                      <Input 
                        id="parkingSpaces" 
                        name="parkingSpaces"
                        type="number" 
                        placeholder="20" 
                        value={commercialForm.parkingSpaces}
                        onChange={handleCommercialChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="occupancyRate">Occupancy Rate (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="occupancyRate"
                        min={0}
                        max={100}
                        step={1}
                        value={[commercialForm.occupancyRate]}
                        onValueChange={(value) => setCommercialForm({...commercialForm, occupancyRate: value[0]})}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{commercialForm.occupancyRate}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="annualIncome">Annual Income ($)</Label>
                      <Input 
                        id="annualIncome" 
                        name="annualIncome"
                        type="number" 
                        placeholder="200000" 
                        value={commercialForm.annualIncome}
                        onChange={handleCommercialChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annualExpenses">Annual Expenses ($)</Label>
                      <Input 
                        id="annualExpenses" 
                        name="annualExpenses"
                        type="number" 
                        placeholder="80000" 
                        value={commercialForm.annualExpenses}
                        onChange={handleCommercialChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button 
                  className="bg-realty-600 hover:bg-realty-700"
                  onClick={calculateCommercialValuation}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Valuation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Valuation Result */}
        {valuationResult !== null && (
          <Card>
            <CardHeader className="bg-realty-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-realty-700" />
                Valuation Result
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-sm font-semibold text-muted-foreground">Estimated Market Value</div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-4xl font-bold text-realty-700">
                    <DollarSign className="h-6 w-6" />
                    {valuationResult.toLocaleString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Property Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {propertyType === 'residential' 
                              ? residentialForm.address
                              : commercialForm.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {propertyType === 'residential' 
                              ? 'Residential'
                              : `Commercial (${commercialForm.propertySubtype})`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {propertyType === 'residential' 
                              ? `${residentialForm.squareFeet.toLocaleString()} sq ft`
                              : `${commercialForm.squareFeet.toLocaleString()} sq ft`}
                          </span>
                        </div>
                        {propertyType === 'residential' && (
                          <>
                            <div className="flex items-center gap-2">
                              <Bed className="h-4 w-4 text-muted-foreground" />
                              <span>{residentialForm.bedrooms} bedrooms</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bath className="h-4 w-4 text-muted-foreground" />
                              <span>{residentialForm.bathrooms} bathrooms</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Built in {propertyType === 'residential' 
                              ? residentialForm.yearBuilt
                              : commercialForm.yearBuilt}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Valuation Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {propertyType === 'residential' ? (
                          <>
                            <div>
                              <div className="font-medium">Location Impact</div>
                              <div className="text-muted-foreground">Major factor in valuation</div>
                            </div>
                            <div>
                              <div className="font-medium">Size & Layout</div>
                              <div className="text-muted-foreground">{residentialForm.squareFeet} sq ft, {residentialForm.bedrooms}BR/{residentialForm.bathrooms}BA</div>
                            </div>
                            <div>
                              <div className="font-medium">Property Age</div>
                              <div className="text-muted-foreground">{2025 - residentialForm.yearBuilt} years old</div>
                            </div>
                            <div>
                              <div className="font-medium">Amenities</div>
                              <div className="text-muted-foreground">
                                {residentialForm.hasGarage ? 'Garage, ' : ''}
                                {residentialForm.hasPool ? 'Pool, ' : ''}
                                {residentialForm.condition} condition
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className="font-medium">Property Type</div>
                              <div className="text-muted-foreground">{commercialForm.propertySubtype.charAt(0).toUpperCase() + commercialForm.propertySubtype.slice(1)}</div>
                            </div>
                            <div>
                              <div className="font-medium">Income Approach</div>
                              <div className="text-muted-foreground">Based on NOI and Cap Rate</div>
                            </div>
                            <div>
                              <div className="font-medium">Occupancy</div>
                              <div className="text-muted-foreground">{commercialForm.occupancyRate}% occupied</div>
                            </div>
                            <div>
                              <div className="font-medium">Net Operating Income</div>
                              <div className="text-muted-foreground">${(commercialForm.annualIncome - commercialForm.annualExpenses).toLocaleString()}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button variant="outline">
                    Generate Report
                  </Button>
                  <Button 
                    className="bg-realty-600 hover:bg-realty-700"
                    onClick={saveValuation}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Valuation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default PropertyValuation;
