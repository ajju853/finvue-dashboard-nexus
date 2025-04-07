
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucideArrowDownUp, Wallet } from 'lucide-react';

export function QuickTradeWidget() {
  const [tradeAmount, setTradeAmount] = React.useState('1000');
  
  return (
    <Card className="glass-card card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <LucideArrowDownUp className="h-5 w-5 text-finPurple" />
          Quick Trade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="buy" className="flex-1">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="flex-1">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Asset</label>
                <span className="text-xs text-muted-foreground">Balance: $32,458.65</span>
              </div>
              <Select defaultValue="btc">
                <SelectTrigger>
                  <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="aapl">Apple Inc. (AAPL)</SelectItem>
                  <SelectItem value="msft">Microsoft Corp. (MSFT)</SelectItem>
                  <SelectItem value="tsla">Tesla Inc. (TSLA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Amount (USD)</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('500')}>$500</Button>
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('1000')}>$1000</Button>
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('5000')}>$5000</Button>
                </div>
              </div>
              <Input
                type="text"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="text-right"
              />
              <div className="text-xs text-right text-muted-foreground">
                Estimated: 0.01584 BTC @ $63,132.28
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select defaultValue="market">
                <SelectTrigger>
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full bg-success hover:bg-success-600">Buy Bitcoin</Button>
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Asset</label>
                <span className="text-xs text-muted-foreground">You own: 0.8542 BTC</span>
              </div>
              <Select defaultValue="btc">
                <SelectTrigger>
                  <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="aapl">Apple Inc. (AAPL)</SelectItem>
                  <SelectItem value="msft">Microsoft Corp. (MSFT)</SelectItem>
                  <SelectItem value="tsla">Tesla Inc. (TSLA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Amount (BTC)</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('0.1')}>0.1</Button>
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('0.25')}>0.25</Button>
                  <Button variant="outline" size="sm" onClick={() => setTradeAmount('0.5')}>0.5</Button>
                </div>
              </div>
              <Input
                type="text"
                value="0.25"
                className="text-right"
              />
              <div className="text-xs text-right text-muted-foreground">
                Estimated: $15,783.07 @ $63,132.28
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select defaultValue="market">
                <SelectTrigger>
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full bg-danger hover:bg-danger-600">Sell Bitcoin</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
