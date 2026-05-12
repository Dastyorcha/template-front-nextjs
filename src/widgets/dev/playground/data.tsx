import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { PlaygroundSection } from "./section";

export function DataSection() {
  return (
    <PlaygroundSection id="data" title="Data display" description="Card, table.">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description.</CardDescription>
              <CardAction>
                <Button size="xs" variant="ghost">
                  Edit
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>Cards group related content and actions.</CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">
                Updated just now
              </span>
            </CardFooter>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Compact card</CardTitle>
              <CardDescription>size=&quot;sm&quot;</CardDescription>
            </CardHeader>
            <CardContent>Smaller padding and gaps.</CardContent>
          </Card>
        </div>

        <Table>
          <TableCaption>A sample table.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Aiymjan</TableCell>
              <TableCell>Lawyer</TableCell>
              <TableCell className="text-right">Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Murod</TableCell>
              <TableCell>Paralegal</TableCell>
              <TableCell className="text-right">Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </PlaygroundSection>
  );
}
